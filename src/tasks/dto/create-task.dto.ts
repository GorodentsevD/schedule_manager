import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  time: string;

  @IsNotEmpty()
  func: string;

  @IsNotEmpty()
  is_active: boolean;
}
