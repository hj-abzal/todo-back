import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Tasks, TasksCreationAttrs, UpdateTask} from '../models/tasks.model';

@Injectable()
export class TasksService {
    constructor(@InjectModel(Tasks) private tasksRepository: typeof Tasks) {
    }

    async create(dto: TasksCreationAttrs): Promise<Tasks> {
        return this.tasksRepository.create(dto);
    }

    async delete(id: number): Promise<any> {
        return this.tasksRepository.destroy({where: {id}})
            .then(() => {
                return {message: 'ok', id};
            })
            .catch(() => {
                throw new BadRequestException({in: 'delete'});
            });
    }

    async getTasksByTodolistId(todolist_id: number): Promise<Tasks[]> {
        return this.tasksRepository.findAll({where: {todolist_id}});
    }

    async updateTask(todolist_id: number, task_id: number, task: UpdateTask) {
        return this.tasksRepository.update(
            {...task},
            {where: {todolist_id, id: task_id}}
        )
            .then((res) => {
                return {message: 'ok', task};
            })
            .catch(() => {
                throw new BadRequestException({in: 'updateTask'});
            });
    }
}
