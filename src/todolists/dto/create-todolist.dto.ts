import {ApiProperty} from '@nestjs/swagger';

export class CreateTodolistDto {
    @ApiProperty({example: 'My goals:', description: 'Title of todolist'})
    readonly title: string;
}
