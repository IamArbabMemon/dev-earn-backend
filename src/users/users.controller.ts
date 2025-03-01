import {
  Controller,
  Post,
  Get,
  Body,
  UsePipes,
  ValidationPipe,
  HttpException,
  HttpStatus,
  Param,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './schemas/users.schema';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuthGuard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    try {
      const users: User[] = await this.usersService.findAll();
      return users;
    } catch (error) {
      // Log the error (optional)
      console.error('Error occurred:', error.message);

      // Re-throw the error with appropriate status and message
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getUserById(@Param('id') id: string) {
    const user = await this.usersService.findUserById(id);
    if (!user)
      throw new NotFoundException();
    return user;
  }

}
