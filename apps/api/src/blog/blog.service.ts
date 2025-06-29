import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BlogDto } from './dto/blog.dto';
import { ProfileService } from '../profile/profile.service';
import { HTTPExceptions } from 'src/common/httpExceptions';
import slugify from 'slugify';

@Injectable()
export class BlogService {
  constructor(
    private prisma: PrismaService,
    private profile: ProfileService,
  ) {}

  async createBlog(userId: string, blogDto: BlogDto) {
    const author = await this.profile.getUserProfile(userId);
    console.log('author', author);
    if (!author?.profileId) {
      return {
        ...HTTPExceptions.NOT_FOUND,
        message: `Author ${HTTPExceptions.NOT_FOUND.message}`,
      };
    }
    let slug = this.generateSlug(blogDto.title);

    let existingBlog = await this.prisma.blog.findUnique({
      where: { slug },
    });

    let count = 1;
    while (existingBlog) {
      slug = `${this.generateSlug(blogDto.title)}-${count}`;
      existingBlog = await this.prisma.blog.findUnique({
        where: { slug },
      });
      count++;
    }

    const blog = await this.prisma.blog.create({
      data: {
        ...blogDto,
        slug,
        authorId: author?.profileId,
      },
    });

    return blog;
  }

  async getBlogs(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const blogs = await this.prisma.blog.findMany({
      skip,
      take: limit,
    });
    const authors = await Promise.all(
      blogs.map((blog) => this.profile.getProfile(blog.authorId)),
    );
    const blog = blogs.map((blog, index) => ({
      ...blog,
      author: authors[index],
    }));

    return blog;
  }

  async getBlogByBlogId(slug: string) {
    const blog = await this.prisma.blog.findFirst({
      where: {
        slug,
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

  async deleteBlogById(blogId: string) {
    const blog = await this.prisma.blog.delete({
      where: {
        blogId,
      },
    });

    return blog;
  }

  generateSlug = (title: string) => {
    return slugify(title, {
      lower: true,
      strict: true,
      trim: true,
    });
  };
}
