import { CronJob } from 'cron';
import { SchedulerRegistry } from '@nestjs/schedule';
import { Injectable, Logger } from '@nestjs/common';
import { FunctionFactoryService } from './factory.service';
import { TaskDocument, Task } from '../tasks/tasks.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChangeStreamDocument } from 'mongodb';

@Injectable()
export class ScheduleManagerService {
  private readonly logger = new Logger(ScheduleManagerService.name);

  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    private schedulerRegistry: SchedulerRegistry,
    private functionFactory: FunctionFactoryService,
  ) {
    this.taskModel
      .watch()
      .on('change', async (data: ChangeStreamDocument<TaskDocument>) => {
        const task = data.fullDocument;

        this.logger.log(`Caught event: "${data.operationType}"`);

        if (data.operationType === 'insert') {
          return this.startTask(task);
        }

        if (data.operationType === 'update') {
          return task.is_active ? this.startTask(task) : this.stopTask(task);
        }

        if (data.operationType === 'delete') {
          return this.deleteTask(task);
        }

        this.logger.error(`Caught unexpected event: "${data.operationType}"`);
      });
  }

  async startTask(task: TaskDocument): Promise<void> {
    if (task.type === 'cron') {
      return this.startCron(task);
    } else {
      throw new Error('Unknown Task type');
    }
  }

  async stopTask(task: TaskDocument): Promise<void> {
    if (task.type === 'cron') {
      return this.stopCron(task);
    } else {
      throw new Error('Unknown Task type');
    }
  }

  async deleteTask(task: TaskDocument): Promise<void> {
    if (task.type === 'cron') {
      if (this.schedulerRegistry.doesExists('cron', task._id)) {
        this.schedulerRegistry.deleteCronJob(task._id);
        this.logger.log(`Task ${task._id} deleted!`);
        return;
      }

      this.logger.log(`Task ${task._id} is not running!`);
      return;
    } else {
      throw new Error('Unknown Task type');
    }
  }

  async startCron(task: TaskDocument): Promise<void> {
    if (this.schedulerRegistry.doesExists('cron', task._id)) {
      this.schedulerRegistry.deleteCronJob(task._id);
    }

    const job = new CronJob(task.time, () =>
      this.functionFactory.getFunction(task.func)(task.time, task._id),
    );

    this.schedulerRegistry.addCronJob(task._id, job);
    job.start();

    this.logger.log(`job ${task._id} added. Cron: ${task.time}`);
  }

  async stopCron(task: TaskDocument): Promise<void> {
    if (!this.schedulerRegistry.doesExists('cron', task._id)) {
      this.logger.log('Task is not running');
      return;
    }

    const job = this.schedulerRegistry.getCronJob(task._id);

    job.stop();
    task.stopped_at = new Date();
    await task.save();

    this.logger.log(`job ${task.id} stopped.`);
  }
}
