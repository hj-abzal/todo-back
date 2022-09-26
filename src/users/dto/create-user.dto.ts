import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {

  @ApiProperty({ example: "email@mail.ru", description: "Email for login" })
  @IsString({ message: "Should be string" })
  @IsEmail({}, { message: "Not correct email format" })
  readonly email: string;


  @ApiProperty({ example: "12345678", description: "Password of an account" })
  @IsString({ message: "Should be string" })
  @Length(4, 16, { message: "Min 4 and max 16" })
  readonly password: string;
}