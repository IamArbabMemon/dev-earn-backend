import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Ahsan', description: 'The first name of the user' })
  @IsNotEmpty()
  @MaxLength(25)
  username: string;

  @ApiProperty({ example: 'ahsan@gmail.com', description: 'The email of user' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password', description: 'The password of user' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: '15-05-1880', description: 'Date of birth ' })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  dob: Date;

  @ApiProperty({ example: 'Russia', description: 'user country' })
  @IsNotEmpty()
  country: string;

  @ApiProperty({ example: 'image', description: 'user image' })
  profilePic: string;
}
