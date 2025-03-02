import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BlogDto } from './dto/blog.dto';
import { ProfileService } from '../profile/profile.service';

@Injectable()
export class BlogService {
  constructor(
    private prisma: PrismaService,
    private profile: ProfileService,
  ) {}

  async createBlog(userId: string, blogDto: BlogDto) {
    const author = await this.profile.getProfile(userId);

    if (!author?.profileId) {
      return 'Author not found';
    }

    const blog = await this.prisma.blog.create({
      data: {
        ...blogDto,
        authorId: author?.profileId,
      },
    });

    return blog;
  }

  async getBlogs() {
    const blogs = await this.prisma.blog.findMany();

    return blogs;
  }
}
