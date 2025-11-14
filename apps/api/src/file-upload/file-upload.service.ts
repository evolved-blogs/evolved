/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import * as multer from 'multer';
import * as multerS3 from 'multer-s3';
import { Multer } from 'multer';

@Injectable()
export class FileUploadService {
  private readonly logger = new Logger(FileUploadService.name);

  constructor(@Inject('S3_CLIENT') private readonly s3Client: S3Client) {}

  async upload(file: Express.Multer.File): Promise<{ fileUrl: string }> {
    const fileName = this.generateFileName(file.originalname);
    const uploadParams = this.createUploadParams(fileName, file.buffer);
    console.log(uploadParams, fileName);
    try {
      const command = new PutObjectCommand(uploadParams);
      await this.s3Client.send(command);
      const fileUrl = this.getFileUrl(fileName);

      return {
        fileUrl,
      };
    } catch (error) {
      this.logger.error('Error uploading file:', error);
      throw error;
    }
  }

  async uploadMultiple(
    files: Express.Multer.File[],
  ): Promise<{ fileUrls: string[] }> {
    const uploadPromises = files.map(async (file) => {
      const fileName = this.generateFileName(file.originalname);
      const uploadParams = this.createUploadParams(fileName, file.buffer);
      try {
        const command = new PutObjectCommand(uploadParams);
        await this.s3Client.send(command);
        return this.getFileUrl(fileName);
      } catch (error) {
        this.logger.error('Error uploading file:', error);
        throw error;
      }
    });

    const fileUrls = await Promise.all(uploadPromises);
    return { fileUrls };
  }

  getMulterS3Upload(): Multer {
    return multer({
      storage: multerS3({
        s3: this.s3Client,
        bucket: process.env.AWS_S3_BUCKET_NAME as string,
        metadata: (
          req: Express.Request,
          file: Express.Multer.File,
          cb: (error: any, metadata?: any) => void,
        ) => {
          cb(null, { fieldName: file.fieldname });
        },
        key: (
          req: Express.Request,
          file: Express.Multer.File,
          cb: (error: any, key?: string) => void,
        ) => {
          const fileName = this.generateFileName(file.originalname);
          cb(null, fileName);
        },
      }),
    });
  }

  private generateFileName(originalName: string): string {
    return `${Date.now()}_${originalName}`;
  }

  private createUploadParams(fileName: string, fileBuffer: Buffer) {
    return {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: fileName,
      Body: fileBuffer,
    };
  }

  private getFileUrl(fileName: string): string {
    return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
  }
}
