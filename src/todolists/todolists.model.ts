import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from 'sequelize-typescript';
import {ApiProperty} from '@nestjs/swagger';
import {User} from '../users/users.model';
import {Tasks} from '../tasks/tasks.model';

export interface TodolistCreationAttrs {
    title: string,
    user_id: number,
}

@Table({ tableName: "todolists" })
export class Todolists extends Model<Todolists, TodolistCreationAttrs> {

    @ApiProperty({example: 1, description: 'Id of user'})
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({example: 'new title', description: 'title of todolist'})
    @Column({ type: DataType.STRING, allowNull: false })
    title: string;

    @ApiProperty({example: '4', description: 'id of author'})
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER,  allowNull: false })
    user_id: number;

    @BelongsTo(() => User)
    author: User;

    @HasMany(() => Tasks)
    tasks: Tasks[]
}