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
import session from 'express-session'; // ✅ Use default import
import passport from 'passport';

const MongoDBStore = require('connect-mongodb-session')(session); // ✅ Use require for compatibility

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/sessions', // MongoDB connection URI
    collection: 'sessions', // Collection name
  });

  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      store: store,
      cookie: { secure: false },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
