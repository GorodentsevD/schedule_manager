import {CronJob} from "cron";
import {SchedulerRegistry} from "@nestjs/schedule";
import {Injectable, Logger} from "@nestjs/common";
import {FunctionFactory} from "./functions/factory";
import {TaskDocument} from "../tasks/tasks.schema";

@Injectable()
export class ScheduleManager {
    constructor(
        private schedulerRegistry: SchedulerRegistry,
        private functionFactory: FunctionFactory,
        private logger: Logger
    ) {
        // TODO: Init connection with mongoDB
        // TODO: Subscribe to Collection change events
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

    async startCron(task: TaskDocument): Promise<void> {
        const job = new CronJob(task.time, () => this.functionFactory.getFunction(task.func));

        this.schedulerRegistry.addCronJob(task.id, job);
        job.start();

        this.logger.log(`job ${task.id} added. Cron: ${task.time}`);
    }

    async stopCron(task: TaskDocument): Promise<void> {
        const job = this.schedulerRegistry.getCronJob(task.id);
        if (!job) throw new Error('Task is not running');

        job.stop();
        task.stopped_at = new Date();
        await task.save();

        this.logger.log(`job ${task.id} stopped.`);
    }
}