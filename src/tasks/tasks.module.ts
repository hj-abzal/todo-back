import {forwardRef, Module} from '@nestjs/common';
import {TasksService} from './tasks.service';
import {AuthModule} from '../auth/auth.module';
import {SequelizeModule} from '@nestjs/sequelize';
import {Tasks} from './tasks.model';

@Module({
  providers: [TasksService],
  imports: [
    SequelizeModule.forFeature([Tasks]),
    forwardRef(() => AuthModule),
  ],
  exports: [TasksService]
})
export class TasksModule {}
