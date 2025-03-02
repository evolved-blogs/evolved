import { Body, Controller, Get, Post } from '@nestjs/common';
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
    return this.blog.getBlogs();
  }

  @Post('create')
  async createBlog(
    @GetCurrentUserId() userId: string,
    @Body() blogDto: BlogDto,
  ) {
    return this.blog.createBlog(userId, blogDto);
  }
}
