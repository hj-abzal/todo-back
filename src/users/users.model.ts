import {Column, DataType, Model, Table} from 'sequelize-typescript';

interface UserCreationAttrs {
    telegramID: number,
    login: string,
    password: string
}

@Table({ tableName: "users" })
export class User extends Model<User, UserCreationAttrs> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.INTEGER, unique: true, allowNull: false })
    telegramID: number;

    @Column({ type: DataType.STRING, allowNull: false })
    login: string;

    @Column({ type: DataType.STRING, allowNull: false })
    password: string;
}