/* eslint-disable max-classes-per-file */
/* eslint-disable import/no-extraneous-dependencies */
import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength, Length } from 'class-validator';

class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 15)
  public name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(18)
  public password: string;

  public profilePicture: string;
}

class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(32)
  public password: string;
}

export { CreateUserDto, UpdateUserDto };
