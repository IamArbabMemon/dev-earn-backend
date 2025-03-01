import { Controller, Post, Body, UnauthorizedException, Request, Res, Get, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request as expressRequest, Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }


    @Post('login')
    async login(@Request() req: expressRequest, @Res() res: Response) {
        // try {
        const { username, password } = req.body;

        // Validate user and get details
        const user = await this.authService.validateUser(username, password);

        // If the user is not found or credentials are wrong, an exception is already thrown
        const token = await this.authService.login(user);

        // Set token in cookies
        res.cookie('token', token, { httpOnly: true });

        return res.status(200).json({ success: true, message: 'Login successful', token });

    }

}
