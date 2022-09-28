import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {TodolistCreationAttrs, Todolists} from '../models/todolists.model';

@Injectable()
export class TodolistsService {
    constructor(@InjectModel(Todolists) private todolistRepository: typeof Todolists) {
    }

    async create(dto: TodolistCreationAttrs): Promise<Todolists> {
        return this.todolistRepository.create(dto)
    }

    async delete(id: number): Promise<any> {
        return this.todolistRepository.destroy({where: {id}})
            .then(() => {
                return {message: 'ok', id};
            })
            .catch(() => {
                throw new BadRequestException({in: 'delete'});
            });
    }

    async getAll(user_id: number): Promise<Todolists[]>  {
        return this.todolistRepository.findAll({where: {user_id}, include: { all: true }});
    }

    async getById(id: number): Promise<Todolists> {
        return this.todolistRepository.findByPk(id, { include: { all: true } });
    }
}
