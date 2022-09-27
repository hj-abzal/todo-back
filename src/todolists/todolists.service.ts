import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {TodolistCreationAttrs, Todolists} from './todolists.model';

@Injectable()
export class TodolistsService {
    constructor(@InjectModel(Todolists) private todolistRepository: typeof Todolists) {
    }

    async create(dto: TodolistCreationAttrs): Promise<Todolists> {
        return this.todolistRepository.create(dto)
    }

    async getAll(): Promise<Todolists[]>  {
        return this.todolistRepository.findAll();
    }

    async getById(id: number): Promise<Todolists> {
        return this.todolistRepository.findByPk(id, { include: { all: true } });
    }
}
