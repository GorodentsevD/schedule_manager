import {Logger} from "@nestjs/common";

const logger = new Logger('testFunc');

export default (cron: string, taskId: string) => logger.log(`TestFunc executed. Cron: ${cron}, TaskId: ${taskId}`);