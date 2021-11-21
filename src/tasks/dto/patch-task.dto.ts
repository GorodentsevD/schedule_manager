import { IsNotEmpty } from 'class-validator';

export class PatchTaskDto {
    @IsNotEmpty()
    id: string;

    date: Date;

    status: string;
}