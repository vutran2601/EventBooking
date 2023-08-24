import { v2 as cloudinary } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    const cloudinaryUrl = 'cloudinary://421689936168269:lcvvRiJqHBzGszet-aRj2ARUqPY@dzqnimtzx';
    return cloudinary.config(cloudinaryUrl);
  },
};
