import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  func: string;

  @Prop({ required: true })
  time: string;

  @Prop({ required: false })
  completed_at: Date;

  @Prop({ required: true })
  is_active: boolean;

  @Prop({ required: false })
  stopped_at: Date;
}

export const TasksSchema = SchemaFactory.createForClass(Task);
