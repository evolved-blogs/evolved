import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { Question } from '@prisma/client';
import { CreateQuestionDto } from './commonDto/createQuestionDto';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  getHello(): string {
    return 'Hello World!';
  }

  async createQuestion(questionData: CreateQuestionDto) {
    return await this.prisma.question.create({
      data: questionData,
    });
  }

  async getQuestions(level: number) {
    return await this.prisma.question.findMany({
      where: { level: Number(level) },
    });
  }
}
