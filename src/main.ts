import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AllExceptionFilter } from './infrastructure/common/filters/exception.filter';
import { LoggerService } from './infrastructure/logger/logger.service';
import { ResponseInterceptor } from './infrastructure/common/interceptors/response.interceptor';
import { LoggingInterceptor } from './infrastructure/common/interceptors/logger.interceptor';
import { ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const env = process.env.NODE_ENV;
  const app = await NestFactory.create(AppModule);

  // Filter
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(
    new AllExceptionFilter(httpAdapterHost, new LoggerService()),
  );

  // pipes
  app.useGlobalPipes(new ValidationPipe());

  // interceptors
  app.useGlobalInterceptors(new LoggingInterceptor(new LoggerService()));
  app.useGlobalInterceptors(new ResponseInterceptor());

  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  if (env !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('My API') // The title of your API
      .setDescription('The API description for my application') // A description
      .setVersion('1.0') // The version of your API
      .addBearerAuth() // Add this if you use bearer token authentication
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document); // The app will serve Swagger UI at /swagger
  }

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
