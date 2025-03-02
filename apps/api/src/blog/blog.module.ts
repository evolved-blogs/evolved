import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProfileModule } from 'src/profile/profile.module';

@Module({
  imports: [PrismaModule, ProfileModule],
  controllers: [BlogController],
  providers: [BlogController, BlogService],
})
export class BlogModule {}
