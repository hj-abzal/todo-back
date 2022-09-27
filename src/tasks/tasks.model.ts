import {Column, DataType, ForeignKey, Model, Table} from 'sequelize-typescript';
import {ApiProperty} from '@nestjs/swagger';
import {Todolists} from '../todolists/todolists.model';

export interface TasksCreationAttrs {
    title: string;
    todolist_id: number;
}

export interface UpdateTask {
    title: string;
    isDone: boolean;
}

@Table({ tableName: "tasks" })
export class Tasks extends Model<Tasks, TasksCreationAttrs> {

    @ApiProperty({example: 1, description: 'Id of task'})
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({example: 'learn react', description: 'title of the task'})
    @Column({ type: DataType.STRING, allowNull: false })
    title: string;

    @ApiProperty({example: 'true/false', description: 'status of the task'})
    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
    isDone: boolean;

    @ApiProperty({example: '1', description: 'id of todolist'})
    @ForeignKey(() => Todolists)
    @Column({ type: DataType.INTEGER,  allowNull: false })
    todolist_id: number;
}