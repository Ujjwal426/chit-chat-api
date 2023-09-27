/* eslint-disable import/no-extraneous-dependencies */
import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

class LoginUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(18)
  public password: string;
}

export default LoginUserDto;
