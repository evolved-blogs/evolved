import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CodeData {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  language!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  code!: string;
}
