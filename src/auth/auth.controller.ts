import { Controller, Session, Get, Request, UseGuards, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './localGuard';

@Controller('auth')
export class AuthController {


    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(@Request() req: any) {
        console.log("inside auth controller")
        console.log(req.user)
        return { message: "logged in", user: req.user }
    }



    @Get()
    async getSession(@Request() req: any, @Session() session: Record<string, any>) {

        console.log(req.session.passport.user);
        console.log(req.user);


    }

}
