// import { PassportSerializer } from '@nestjs/passport';
// import { Injectable } from '@nestjs/common';
// import { UsersService } from '../users/users.service';

// @Injectable()
// export class SessionSerializer extends PassportSerializer {

//     constructor(private readonly usersService: UsersService) {
//         super()
//     }

//     serializeUser(user: any, done: (err: any, user: any) => void) {
//         console.log('Serializing User:', user); // Debugging
//         done(null, user._id); // Store only the user ID in the session
//     }

//     async deserializeUser(userId: string, done: (err: any, user: any) => void) {
//         const userInDB = await this.usersService.findUserById(userId);
//         console.log('Deserializing User:', userInDB); // Debugging
//         return userInDB ? done(null, userInDB) : done(null, null);
//     }
// }
import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(private readonly usersService: UsersService) {
        super();
    }

    serializeUser(user: any, done: (err: any, id: any) => void) {
        console.log('Serializing User:', user);
        done(null, user._id); // Store only user ID
    }

    // async deserializeUser(userId: string, done: (err: any, user: any) => void) {
    //     try {
    //         const userInDB = await this.usersService.findUserById(userId);
    //         console.log('Deserializing User:', userInDB);
    //         if(!userInDB)
    //             return done(nu,null);
    //         return userInDB ? done(null, userInDB) : done(null, null);
    //     } catch (error) {
    //         return done(error, null);
    //     }
    // }

    async deserializeUser(userId: string, done: (err: any, user: any) => void) {
        try {
            const userInDB = await this.usersService.findUserById(userId);
            console.log('Deserializing User:', userInDB);

            if (!userInDB) {
                console.log('User not found in DB');
                return done(null, null);
            }

            return done(null, userInDB); // Ensure a full object is returned
        } catch (error) {
            console.error('Error in deserializeUser:', error);
            return done(error, null);
        }
    }
}
