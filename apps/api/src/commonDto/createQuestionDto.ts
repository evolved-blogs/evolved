import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsArray,
  ArrayNotEmpty,
  IsObject,
} from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  slug!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description!: string;

  @ApiProperty()
  level!: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @ApiProperty({ type: [String] })
  languages!: string[];

  @IsObject()
  @ApiProperty({
    type: 'object',
    additionalProperties: { type: 'string' },
    example: { python: '...', javascript: '...' },
  })
  starterCode!: Record<string, string>;
}
