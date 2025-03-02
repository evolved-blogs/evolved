import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class ProfileDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  lastName!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  bio!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  avatar!: string;
}

// export class UpdateProfileDto {
//   @IsString()
//   @IsNotEmpty()
//   @ApiProperty()
//   firstName!: string;

//   @IsString()
//   @IsNotEmpty()
//   @ApiProperty()
//   lastName!: string;

//   @IsString()
//   @IsNotEmpty()
//   @ApiProperty()
//   bio!: string;

//   @IsString()
//   @IsNotEmpty()
//   @ApiProperty()
//   avatar!: string;
// }
