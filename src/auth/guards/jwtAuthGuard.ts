import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class JwtAuthGuard {
    constructor(private readonly configService: ConfigService) {

    }

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const token = await this.extractToken(request);
        const secret = this.configService.get('JWT_SECRET');
        console.log("token : ", token)

        if (!token) {
            throw new UnauthorizedException('No token found');
        }

        try {
            const payload = await jwt.verify(token, secret);
            console.log(payload)
            request.user = payload;
            return true;
        } catch (err) {
            console.log(err);
            throw new UnauthorizedException('Invalid token');
        }
    }

    private async extractToken(request: Request): Promise<any> {
        let token;
        if (request.cookies && request.cookies.token) {
            token = request.cookies.token
        }
        else {
            token = request.headers.authorization?.split(' ')[1];
        }

        return token;
    }


}

