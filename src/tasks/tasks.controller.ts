import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.schema';
import { PatchTaskDto } from './dto/patch-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Get(':id')
    findOne(@Param() params): Promise<Task> {
        return this.tasksService.findById(params.id);
    }

    @Get()
    getAll(): Promise<Task[]> {
        return this.tasksService.getAll();
    }

    @Post()
    create(@Body() data: CreateTaskDto): Promise<Task> {
        return this.tasksService.create(data);
    }

    @Patch(':id')
    patch(@Param() params, @Body() data: PatchTaskDto): Promise<Task> {
        return this.tasksService.patch(params.id, data);
    }
}