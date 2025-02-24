import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class AuthDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
