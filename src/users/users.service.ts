import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/users.schema';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashedPassword;
    const user = new this.userModel(createUserDto);
    return user.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().select('-__v -password');
  }

  async findUserById(id: string): Promise<User | null> {
    const user = await this.userModel.findById(id);
    return user ? user : null;
  }

  async findUserByUsername(username: string): Promise<any> {
    const user = await this.userModel.findOne({ username });
    console.log("inside service user find by username ", user)
    return user ? user : null;
  }


}
