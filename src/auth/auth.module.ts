// // import { Module } from '@nestjs/common';
// // import { AuthService } from './auth.service';
// // import { AuthController } from './auth.controller';

// // @Module({
// //   providers: [AuthService],
// //   controllers: [AuthController]
// // })
// // export class AuthModule {}
// import { Module } from '@nestjs/common';
// import { JwtModule, JwtService } from '@nestjs/jwt';
// import { AuthService } from './auth.service';
// import { AuthController } from './auth.controller';
// import { UsersModule } from '../users/users.module';
// import { JwtAuthGuard } from './guards/jwtAuthGuard';

// @Module({
//   imports: [
//     UsersModule,
//     JwtModule.register({
//       secret: 'fsfsf554@#$R#%$#^1',
//       signOptions: { expiresIn: '1h' },
//     }),
//   ],
//   providers: [AuthService, JwtAuthGuard, JwtService],
//   controllers: [AuthController],
// })
// export class AuthModule { }
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './guards/jwtAuthGuard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  providers: [JwtAuthGuard, AuthService],
  exports: [JwtModule, JwtAuthGuard, AuthService],
  controllers: [AuthController]
})
export class AuthModule { }
