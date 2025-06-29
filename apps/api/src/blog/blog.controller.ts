import { Body, Controller, Get, Param, Post, Delete } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogDto } from './dto/blog.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { GetCurrentUserId } from 'src/common/enum/decorators/getCurrentUserId.decorator';

@Controller('blog')
@ApiBearerAuth()
export class BlogController {
  constructor(private blog: BlogService) {}

  @Get()
  async getBlogs() {
    const blogs = await this.blog.getBlogs();
    return blogs;
  }

  @Post('create')
  async createBlog(
    @GetCurrentUserId() userId: string,
    @Body() blogDto: BlogDto,
  ) {
    console.log('userId', userId);
    const blog = await this.blog.createBlog(userId, blogDto);
    return blog;
  }

  @Get('get-blog/:blogId')
  async getBlogByBlogId(@Param('blogId') blogId: string) {
    console.log('blogId', blogId);
    const blog = await this.blog.getBlogByBlogId(blogId);
    return blog;
  }

  @Delete('delete-blog/:blogId')
  async deleteBlogById(@Param('blogId') blogId: string) {
    console.log('blogId', blogId);
    const blog = await this.blog.deleteBlogById(blogId);
    return blog;
  }
}
