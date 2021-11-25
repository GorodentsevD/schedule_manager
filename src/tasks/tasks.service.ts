import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './tasks.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { PatchTaskDto } from './dto/patch-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(createTaskDto: CreateTaskDto): Promise<TaskDocument> {
    const newTask = new this.taskModel(createTaskDto);
    return newTask.save();
  }

  findById(id: string): Promise<TaskDocument> {
    return this.taskModel.findOne({ id }).exec();
  }

  async getAll(): Promise<TaskDocument[]> {
    return this.taskModel.find().exec();
  }

  async patch(id: string, patchTaskDto: PatchTaskDto): Promise<TaskDocument> {
    return this.taskModel.findOneAndUpdate({ id }, patchTaskDto).exec();
  }

  async delete(id: string): Promise<void> {
    await this.taskModel.deleteOne({ id }).exec();
  }
}
