import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import {TasksModule} from "./tasks/tasks.module";
import {ScheduleManagerModule} from "./manager/scheduleManager.module";

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        MongooseModule.forRoot(process.env.DATABASE_URL),
        ScheduleModule.forRoot(),
        TasksModule,
        ScheduleManagerModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
