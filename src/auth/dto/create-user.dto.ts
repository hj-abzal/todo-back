import {ApiProperty} from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({example: 1071927152, description: 'unic telegram id of user'})
  readonly telegram_id: number;

  @ApiProperty({example: 'Suan', description: 'login you want'})
  readonly login: string;

  @ApiProperty({example: '7777', description: 'password of user'})
  readonly password: string;
}