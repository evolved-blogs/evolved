import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProfileDto } from './dto/profile.dto';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async getProfile(profileId: string) {
    const profile = await this.prisma.profile.findUnique({
      where: {
        profileId,
      },
    });
    return profile;
  }

  async getUserProfile(userId: string) {
    const profile = await this.prisma.profile.findUnique({
      where: {
        userId,
      },
    });

    return profile;
  }

  async createProfile(userId: string) {
    const profile = await this.prisma.profile.create({
      data: {
        userId,
      },
    });

    return profile;
  }

  async updateProfile(userId: string, updateProfileDto: ProfileDto) {
    const userProfile = await this.getUserProfile(userId);
    const { profileId } = userProfile || {};
    const profile = await this.prisma.profile.update({
      where: {
        profileId,
      },
      data: {
        ...updateProfileDto,
      },
    });

    return profile;
  }
}
