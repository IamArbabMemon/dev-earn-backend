import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Passport } from 'passport';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from './sessionSerializer';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './localStrategy';

@Module({
  imports: [PassportModule.register({
    session: true
  }),
    UsersModule
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, SessionSerializer]
})
export class AuthModule { }
