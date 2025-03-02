import { IsOptional } from 'class-validator';
import { AuthDto } from './auth.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SignUpDto extends AuthDto {
  @IsOptional()
  @ApiPropertyOptional()
  userName?: string;
}
