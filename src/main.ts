import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Blog-tech')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config, {});
  SwaggerModule.setup('', app, document);

  await app.listen(process.env.port || 3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
