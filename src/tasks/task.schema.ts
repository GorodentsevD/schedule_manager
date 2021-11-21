import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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