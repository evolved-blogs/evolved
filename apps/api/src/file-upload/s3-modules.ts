import { Module } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';

@Module({
  providers: [
    {
      provide: 'S3_CLIENT',
      useFactory: () => {
        return new S3Client({
          region: process.env.AWS_REGION || 'default-region',
          credentials: {
            accessKeyId:
              process.env.AWS_ACCESS_KEY_ID || 'default-access-key-id',
            secretAccessKey:
              process.env.AWS_SECRET_ACCESS_KEY || 'default-secret-access-key',
          },
        });
      },
    },
  ],
  exports: ['S3_CLIENT'],
})
export class S3Module {}
