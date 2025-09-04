import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Create a Swagger configuration object using DocumentBuilder
  const config = new DocumentBuilder()
    .setTitle('My API') // The title of your API
    .setDescription('The API description for my application') // A description
    .setVersion('1.0') // The version of your API
    .addTag('cats') // You can add tags to group endpoints
    .addBearerAuth() // Add this if you use bearer token authentication
    .build();

  // 2. Create a Swagger document
  const document = SwaggerModule.createDocument(app, config);

  // 3. Set up the Swagger UI endpoint
  SwaggerModule.setup('swagger', app, document); // The app will serve Swagger UI at /swagger

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
