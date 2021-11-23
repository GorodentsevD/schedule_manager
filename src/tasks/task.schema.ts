import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CronJob } from 'cron';
import { FunctionFactory } from '../manager/functions/factory'
import {SchedulerRegistry} from "@nestjs/schedule";

export type TaskDocument = Task & Document;

@Schema()
export class Task {
    constructor(private schedulerRegistry: SchedulerRegistry) {}

  @Prop({ required: true })
      type: string;

  @Prop({required: true})
      func: string;

  @Prop({ required: true })
      time: string;

  @Prop({ required: true })
      status: string;

  @Prop({ required: false })
      completed_at: Date;

  @Prop({ required: true })
      is_active: boolean;

  @Prop({required: false})
      stopped_at: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
