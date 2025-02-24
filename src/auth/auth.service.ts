import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {

    constructor(private readonly usersService: UsersService) { }


    async validateUser(username: string, pass: string): Promise<any> {
        console.log("inside auth service validate")
        const user = await this.usersService.findUserByUsername(username);
        console.log(user);
        if (!user)
            return null;
        const passMatched = await bcrypt.compare(pass, user.password);

        if (!passMatched)
            return null;

        const { password, ...userToBeSend } = user.toObject();

        console.log("i am to be send", userToBeSend)

        return userToBeSend;

    }
}
