import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('PlateUp API')
    .setDescription('Documentación de la API de PlateUp Mobile (NestJS + MongoDB + Cloudinary)')
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Ingresa el token JWT en formato: Bearer <JWT>',
        in: 'header',
      },
      'JWT-auth',
    )
    .addTag('Auth', 'Autenticación y perfil de usuario')
    .addTag('Recipes', 'Gestión y filtrado de recetas')
    .addTag('Ingredients', 'Gestión de ingredientes y macro-nutrientes')
    .addTag('Meal Plans', 'Planes de comidas semanales')
    .addTag('Pantry', 'Despensa e inventario del usuario')
    .addTag('Shopping List', 'Lista de compras inteligente')
    .addTag('Stats', 'Estadísticas del dashboard de usuario')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`🚀 NestJS corriendo en http://0.0.0.0:${port}`);
  console.log(`📚 Swagger Docs disponibles en http://localhost:${port}/api/docs`);
}
bootstrap();
