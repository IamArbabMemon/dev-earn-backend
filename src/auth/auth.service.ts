import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
    private readonly secret
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) {
        this.secret = this.configService.get('JWT_SECRET');
    }

    async validateUser(username: string, password: string): Promise<any> {
        try {
            const user = await this.usersService.findUserByUsername(username);

            if (!user) {
                throw new HttpException('User not found', 404);
            }

            const passwordMatched = await bcrypt.compare(password, user.password);

            if (!passwordMatched) {
                throw new HttpException('Invalid credentials', 401);
            }

            return user;
        } catch (error) {
            console.log(error);
            throw new HttpException(error.message, error.status || 500);
        }
    }


    async login(user: any) {
        const payload = { username: user.username, id: user._id };
        return jwt.sign(payload, this.secret);
    }
}
