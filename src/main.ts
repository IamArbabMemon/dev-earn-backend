// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import * as session from 'express-session';
// import * as passport from 'passport';
// import MongoStore from 'connect-mongo';


// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.use(session({
//     store: MongoStore.create({
//       mongoUrl: 'mongodb://localhost:27017/', // MongoDB connection URI
//       collectionName: 'sessions', // Collection where sessions will be stored
//       ttl: 14 * 24 * 60 * 60, // Expiry time (14 days)
//       autoRemove: 'native', // Automatically remove expired sessions
//     }),
//     secret: "my-secret",
//     resave: false,
//     saveUninitialized: false,
//     cookie: { secure: false }
//   }));

//   app.use(passport.initialize());
//   app.use(passport.session());
//   await app.listen(process.env.PORT ?? 3000);

// }
// bootstrap();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api/v1');
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle("DEV EARN API SET")
    .setDescription("dev earn description")
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableCors({
    origin: true
  });
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
