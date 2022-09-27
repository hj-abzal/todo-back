import {forwardRef, Module} from '@nestjs/common';
import {TodolistsController} from './todolists.controller';
import {TodolistsService} from './todolists.service';
import {SequelizeModule} from '@nestjs/sequelize';
import {Todolists} from './todolists.model';
import {AuthModule} from '../auth/auth.module';
import {TasksModule} from '../tasks/tasks.module';

@Module({
    controllers: [TodolistsController],
    providers: [TodolistsService],
    imports: [
        SequelizeModule.forFeature([Todolists]),
        forwardRef(() => AuthModule),
        TasksModule
    ]
})
export class TodolistsModule {
}
