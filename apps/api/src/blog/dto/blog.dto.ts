import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsDate,
} from 'class-validator';

import { BlogStatus } from '@prisma/client';

export class BlogDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  content!: string;

  @IsString()
  authorId!: string;

  @IsDate()
  createdAt?: Date;

  @IsDate()
  updatedAt?: Date;

  @IsEnum(BlogStatus)
  @ApiProperty()
  status!: BlogStatus;

  @IsOptional()
  @IsDate()
  publishedAt?: Date;

  @IsOptional()
  @IsDate()
  deletedAt?: Date;
}
