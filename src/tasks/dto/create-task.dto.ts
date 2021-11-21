import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
    @IsNotEmpty()
    type: string;

    @IsNotEmpty()
    date: Date;

    @IsNotEmpty()
    func: string

    @IsNotEmpty()
    is_active: Boolean
}