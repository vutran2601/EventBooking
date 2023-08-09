import { v2 as cloudinary } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return cloudinary.config({
      cloud_name: 'dooibzxxg',
      api_key: '415581119926739',
      api_secret: 'XUdqprJX1_cphmz7BUzG1MRFCvg',
    });
  },
};
