import { IsNotEmpty } from 'class-validator';

export class PatchTaskDto {
  @IsNotEmpty()
  id: string;

  time: string;

  is_active: boolean;
}
