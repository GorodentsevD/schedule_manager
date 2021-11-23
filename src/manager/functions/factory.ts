import { Injectable } from '@nestjs/common';
import testFunc from './testFunc';

@Injectable()
export class FunctionFactory {
    public getFunction(func: string) : (cron: string, taskId: string) => void {
        switch(func) {
        case 'testFunc': 
            return testFunc;
        default: 
            throw new Error(`Unknown function alias: "${func}"`);
        }
    }
}