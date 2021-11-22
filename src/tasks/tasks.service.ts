import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { PatchTaskDto} from "./dto/patch-task.dto";

@Injectable()
export class TasksService {
    constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

    async create(createTaskDto: CreateTaskDto): Promise<Task> {
        const newTask = new this.taskModel(createTaskDto);
        return newTask.save();
    }

    findById(id: string): Promise<Task> {
        return this.taskModel.findOne({id}).exec();
    }

    async getAll(): Promise<Task[]> {
        return this.taskModel.find().exec();
    }

    async patch(id: string, patchTaskDto: PatchTaskDto): Promise<Task> {
        return this.taskModel.findOneAndUpdate({id}, patchTaskDto);
    }
}
