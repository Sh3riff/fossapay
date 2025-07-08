import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Fossapay')
    .setDescription('The Fossapay API documentation')
    .addServer('https://fossapay.deploy.name.ng') // Replace with your actual server URL
    .addServer('http://localhost:3000') // Replace with your actual server URL
    .addBearerAuth()
    .setVersion('1.0.0')
    .addTag('fossapay')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
