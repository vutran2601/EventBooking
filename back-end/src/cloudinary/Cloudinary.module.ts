import { Module } from '@nestjs/common';
import { CloudinaryService } from './Cloudinary.service';
import { CloudinaryProvider } from './Cloudinary.provider';

@Module({
  providers: [CloudinaryService, CloudinaryProvider],
  exports: [CloudinaryService, CloudinaryProvider],
})
export class CloudinaryModule {}
