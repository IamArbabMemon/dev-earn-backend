import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';


export class CreateUserDto {
  @IsNotEmpty()
  @MaxLength(25)
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  dob: Date;

  @IsNotEmpty()
  country: string;

  profilePic: string;
}
