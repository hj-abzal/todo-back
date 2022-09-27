import {ApiProperty} from '@nestjs/swagger';

export class CreateTaskDto {
    @ApiProperty({example: 'buy bread', description: 'Title of task'})
    readonly title: string;
}
