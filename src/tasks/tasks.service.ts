import { Model } from 'mongoose';
import {Injectable, LoggerService} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Task, TaskDocument, TaskSchema} from './task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { PatchTaskDto} from './dto/patch-task.dto';
import {CronJob} from 'cron';
import {FunctionFactory} from '../manager/functions/factory';
import {SchedulerRegistry} from '@nestjs/schedule';

@Injectable()
export class TasksService {
    constructor(
        @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
        private schedulerRegistry: SchedulerRegistry,
        private logger: LoggerService,
        private functionFactory: FunctionFactory
    ) {
    }

    async create(createTaskDto: CreateTaskDto): Promise<TaskDocument> {
        const newTask = new this.taskModel(createTaskDto);
        return newTask.save();
    }

    findById(id: string): Promise<TaskDocument> {
        return this.taskModel.findOne({id}).exec();
    }

    async getAll(): Promise<TaskDocument[]> {
        return this.taskModel.find().exec();
    }

    async patch(id: string, patchTaskDto: PatchTaskDto): Promise<TaskDocument> {
        return this.taskModel.findOneAndUpdate({id}, patchTaskDto).exec();
    }

    async startCron(id: string, cron: string): Promise<void> {
        const task = await this.findById(id);

        const job = new CronJob(cron, () => this.functionFactory.getFunction(task.func));

        this.schedulerRegistry.addCronJob(task.id, job);
        job.start();

        this.logger.log(`job ${task.id} added. Cron: ${cron}`);
    }

    async stopCron(id: string): Promise<void> {
        const task = await this.findById(id);
        if (!task) throw new Error('Task not found');

        const job = this.schedulerRegistry.getCronJob(id);
        if (!job) throw new Error('Task is not running');

        job.stop();
        task.stopped_at = new Date();
        await task.save();

        this.logger.log(`job ${task.id} stopped.`);
    }
}
