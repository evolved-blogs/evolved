import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { writeFileSync, unlinkSync } from 'fs';
import { promisify } from 'util';
import { exec } from 'child_process';
import { Public } from './common/enum/decorators/public.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CodeData } from './commonDto/codeDatadto';
import { CreateQuestionDto } from './commonDto/createQuestionDto';

const execAsync = promisify(exec);
@ApiBearerAuth()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @Post('run')
  async runCode(@Body() data: CodeData) {
    const { language, code } = data;

    const config = {
      python: {
        filename: 'main.py',
        runCmd: 'python3 main.py',
      },
      javascript: {
        filename: 'main.js',
        runCmd: 'node main.js',
      },
    }[language];

    if (!config) return { error: 'Unsupported language' };

    const filePath = `${process.cwd()}/temp/${config.filename}`;
    try {
      writeFileSync(filePath, code);

      const { stdout, stderr } = await execAsync(config.runCmd, {
        cwd: `${process.cwd()}/temp`,
        timeout: 3000,
      });

      return { output: stdout || stderr };
    } catch (error: any) {
      return {
        error: error.stderr || error.message || 'Execution failed',
      };
    } finally {
      try {
        unlinkSync(filePath);
      } catch (_) {}
    }
  }

  @Public()
  @Post('questions')
  async createQuestion(@Body() questionData: CreateQuestionDto) {
    return await this.appService.createQuestion(questionData);
  }

  @Public()
  @Get('questions/:level')
  async getQuestions(@Param('level') level: number) {
    return await this.appService.getQuestions(level);
  }
}
