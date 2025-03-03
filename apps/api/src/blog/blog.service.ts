import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BlogDto } from './dto/blog.dto';
import { ProfileService } from '../profile/profile.service';
import { HTTPExceptions } from 'src/common/httpExceptions';

@Injectable()
export class BlogService {
  constructor(
    private prisma: PrismaService,
    private profile: ProfileService,
  ) {}

  async createBlog(userId: string, blogDto: BlogDto) {
    const author = await this.profile.getProfile(userId);

    if (!author?.profileId) {
      return {
        ...HTTPExceptions.NOT_FOUND,
        message: `Author ${HTTPExceptions.NOT_FOUND.message}`,
      };
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
    const authors = await Promise.all(
      blogs.map((blog) => this.profile.getProfile(blog.authorId)),
    );
    const blog = blogs.map((blog, index) => ({
      ...blog,
      author: authors[index],
    }));

    return blog;
  }

  async getBlogByBlogId(blogId: string) {
    const blog = await this.prisma.blog.findUnique({
      where: {
        blogId,
      },
    });

    if (!blog) {
      return {
        ...HTTPExceptions.NOT_FOUND,
        message: `Blog ${HTTPExceptions.NOT_FOUND.message}`,
      };
    }

    const author = await this.profile.getProfile(blog.authorId);

    return {
      ...blog,
      author,
    };
  }
}
