import { v2 as cloudinary } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    const cloudinaryUrl = process.env.CLOUDINARY_URL;
    if (!cloudinaryUrl) {
      throw new Error('CLOUDINARY_URL environment variable is not set.');
    }
    return cloudinary.config(cloudinaryUrl);
  },
};
