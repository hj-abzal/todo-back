import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {ConfigModule} from '@nestjs/config';
import {User} from './auth/models/users.model';
import {AuthModule} from './auth/auth.module';
import {TodolistsModule} from './todolists/todolists.module';
import {Todolists} from './todolists/models/todolists.model';
import {Tasks} from './todolists/models/tasks.model';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: +process.env.POSTGRES_PORT,
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            ssl: false,
            models: [User, Todolists, Tasks],
            autoLoadModels: true
        }),
        AuthModule,
        TodolistsModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
