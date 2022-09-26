import {Column, DataType, Model, Table} from 'sequelize-typescript';
import {ApiProperty} from '@nestjs/swagger';

interface UserCreationAttrs {
    telegramID: number,
    login: string,
    password: string
}

@Table({ tableName: "users" })
export class User extends Model<User, UserCreationAttrs> {

    @ApiProperty({example: 1, description: 'Id of user'})
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({example: 1071927152, description: 'unic telegram id of user'})
    @Column({ type: DataType.INTEGER, unique: true, allowNull: false })
    telegramID: number;

    @ApiProperty({example: 'Suan', description: 'login you want'})
    @Column({ type: DataType.STRING, allowNull: false })
    login: string;

    @ApiProperty({example: '7777', description: 'password of user'})
    @Column({ type: DataType.STRING, allowNull: false })
    password: string;
}