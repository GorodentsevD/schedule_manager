import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Cron } from '@nestjs/schedule';
import {CronJob} from "cron";


export type TaskDocument = Task & Document;

@Schema()
export class Task {
    @Prop({required: true})
    type: string;

    @Prop({required: true})
    date: Date;

    @Prop({required: true})
    func: string;

    @Prop({required: true})
    status: string;

    @Prop({required: true})
    completed_at: Date;

    @Prop({required: true})
    is_active: Boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

TaskSchema.methods.startCron = async function (cron): Promise<void> {
    const job = new CronJob(cron, () => {

    });

    //this.schedulerRegistry.addCronJob(this.name, job);
    //job.start();

    this.logger.warn(
        `job ${name} added for each minute at ${seconds} seconds!`,
    );
};

TaskSchema.methods.stopCron = async function (): Promise<void> {

};
