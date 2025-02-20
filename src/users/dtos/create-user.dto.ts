import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsDate,
} from 'class-validator';

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
  dob: Date;

  @IsNotEmpty()
  country: string;

  profilePic: string;
}
