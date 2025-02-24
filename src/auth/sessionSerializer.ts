import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {

    constructor(private readonly usersService: UsersService) {
        super()
    }

    serializeUser(user: any, done: (err: any, user: any) => void) {
        console.log('Serializing User:', user); // Debugging
        done(null, user); // Store only the user ID in the session
    }

    async deserializeUser(user: any, done: (err: any, user: any) => void) {
        const userInDB = await this.usersService.findUserByUsername(user.username);
        console.log('Deserializing User:', userInDB); // Debugging
        return userInDB ? done(null, userInDB) : done(null, null);
    }
}
