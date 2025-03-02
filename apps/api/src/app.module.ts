import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { BlogService } from './blog/blog.service';
import { BlogModule } from './blog/blog.module';
import { ProfileService } from './profile/profile.service';
import { ProfileModule } from './profile/profile.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './common/guards/accessToken.guard';
import { FileUploadService } from './file-upload/file-upload.service';
import { FileUploadController } from './file-upload/file-upload.controller';
import { FileUploadModule } from './file-upload/file-upload.module';
import { S3Module } from './file-upload/s3-modules';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    JwtModule,
    ConfigModule,
    BlogModule,
    ProfileModule,
    UserModule,
    FileUploadModule,
    S3Module,
  ],
  controllers: [
    AppController,
    AuthController,
    UserController,
    FileUploadController,
  ],
  providers: [
    AppService,
    AuthService,
    BlogService,
    ProfileService,
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    FileUploadService,
  ],
})
export class AppModule {}
