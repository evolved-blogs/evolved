import { Body, Controller, Get, Put } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { GetCurrentUserId } from 'src/common/enum/decorators/getCurrentUserId.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ProfileDto } from './dto/profile.dto';

@Controller('profile')
@ApiBearerAuth()
export class ProfileController {
  constructor(private profile: ProfileService) {}

  @Get()
  async getProfile(@GetCurrentUserId() userId: string) {
    const profile = await this.profile.getProfile(userId);

    return profile;
  }

  // @Post('add')
  // async createProfile(@GetCurrentUserId() userId: string) {
  //   return this.profile.createProfile(userId);
  // }

  @Put()
  async updateProfile(
    @GetCurrentUserId() userId: string,
    @Body() profileData: ProfileDto,
  ) {
    const updatedProfile = await this.profile.updateProfile(
      userId,
      profileData,
    );
    return updatedProfile;
  }
}
