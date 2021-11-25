import { Module } from '@nestjs/common';
import {ScheduleManagerService} from "./scheduleManager.service";
import {MongooseModule} from "@nestjs/mongoose";
import {Task, TasksSchema} from "../tasks/tasks.schema";
import {FunctionFactoryService} from "./factory.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Task.name, schema: TasksSchema }]),
    ],
    providers: [ScheduleManagerService, FunctionFactoryService],
})
export class ScheduleManagerModule {}