import { Module } from '@nestjs/common';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from './file-upload.service';
import { S3Module } from './s3-modules';
@Module({
  imports: [S3Module],
  exports: [FileUploadService, FileUploadController],
  controllers: [FileUploadController],
  providers: [FileUploadService, FileUploadController],
})
export class FileUploadModule {}
