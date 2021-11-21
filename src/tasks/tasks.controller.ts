import {Body, Controller, Get, Post} from '@nestjs/common';
import { TasksService } from './tasks.service';
import {CreateTaskDto} from "./dto/create-task.dto";
import {Task} from "./task.schema";

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Get()
    getAll(): Promise<Task[]> {
        return this.tasksService.getAll();
    }

    @Post()
    create(@Body() data: CreateTaskDto): Promise<Task> {
        return this.tasksService.create(data);
    }
}