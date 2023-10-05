import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3001', // The origin that is allowed to access the resource
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // The methods allowed when accessing the resource
    allowedHeaders: 'Content-Type, Accept', // The headers that can be used when making the actual request
  });  
  await app.listen(3000);
}
bootstrap();
