import {forwardRef, Module} from '@nestjs/common';
import {TodolistsController} from './todolists.controller';
import {TodolistsService} from './services/todolists.service';
import {SequelizeModule} from '@nestjs/sequelize';
import {Todolists} from './models/todolists.model';
import {AuthModule} from '../auth/auth.module';
import {TasksService} from './services/tasks.service';
import {Tasks} from './models/tasks.model';

@Module({
    controllers: [TodolistsController],
    providers: [
        TodolistsService,
        TasksService
    ],
    imports: [
        SequelizeModule.forFeature([Todolists, Tasks]),
        forwardRef(() => AuthModule),
    ]
})
export class TodolistsModule {
}
