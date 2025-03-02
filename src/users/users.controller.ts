// import {
//   Controller,
//   Post,
//   Get,
//   Body,
//   UsePipes,
//   ValidationPipe,
//   HttpException,
//   HttpStatus,
//   Param,
//   NotFoundException,
//   UseGuards,
// } from '@nestjs/common';
// import { UsersService } from './users.service';
// import { CreateUserDto } from './dtos/create-user.dto';
// import { User } from './schemas/users.schema';
// import { JwtAuthGuard } from 'src/auth/guards/jwtAuthGuard';

// @Controller('users')
// export class UsersController {
//   constructor(private readonly usersService: UsersService) { }

//   @Post()
//   @UsePipes(new ValidationPipe({ transform: true }))
//   async create(@Body() createUserDto: CreateUserDto): Promise<User> {
//     return this.usersService.create(createUserDto);
//   }

//   @Get()
//   async findAll(): Promise<User[]> {
//     try {
//       const users: User[] = await this.usersService.findAll();
//       return users;
//     } catch (error) {
//       // Log the error (optional)
//       console.error('Error occurred:', error.message);

//       // Re-throw the error with appropriate status and message
//       throw new HttpException(
//         error.message || 'Internal server error',
//         error.status || HttpStatus.INTERNAL_SERVER_ERROR,
//       );
//     }
//   }

//   @Get('/:id')
//   @UseGuards(JwtAuthGuard)
//   async getUserById(@Param('id') id: string) {
//     const user = await this.usersService.findUserById(id);
//     if (!user)
//       throw new NotFoundException();
//     return user;
//   }

// }
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
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './schemas/users.schema';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuthGuard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.', type: User })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiBody({ type: CreateUserDto })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users.', type: [User] })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async findAll(): Promise<User[]> {
    try {
      const users: User[] = await this.usersService.findAll();
      return users;
    } catch (error) {
      console.error('Error occurred:', error.message);
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({ status: 200, description: 'Return the user.', type: User })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiParam({ name: 'id', required: true, description: 'The ID of the user to retrieve' })
  async getUserById(@Param('id') id: string): Promise<User> {
    const user = await this.usersService.findUserById(id);
    if (!user) throw new NotFoundException();
    return user;
  }
}
