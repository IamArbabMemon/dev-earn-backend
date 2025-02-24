import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super(); // Default is 'username', change if needed
    }

    async validate(username: string, password: string): Promise<any> {
        console.log("inside local strategy")
        console.log(username, password)
        const user = await this.authService.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        console.log("inside validate of local strategy", user)
        return user;
    }
}
