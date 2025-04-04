import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsDate,
  IsNumber,
} from 'class-validator';

import { BlogStatus } from '@prisma/client';

export class BlogDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title!: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  thumbnail?: string;

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
