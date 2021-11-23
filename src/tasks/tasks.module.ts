import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task, TasksSchema } from './tasks.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Task.name, schema: TasksSchema }])],
    controllers: [TasksController],
    providers: [TasksService],
})
export class CatsModule {}