import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {User} from './users.model';
import {CreateUserDto} from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User) {
    }

    async create(dto: CreateUserDto): Promise<User> {
        return await this.userRepository.create(dto);
    }

    async getAll(): Promise<User[]>  {
        return this.userRepository.findAll();
    }

    async getById(id: number): Promise<User> {
        return this.userRepository.findByPk(id, { include: { all: true } });
    }

    async getByTelegramID(telegram_id: number): Promise<User> {
        return this.userRepository.findOne({ where: { telegram_id }, include: { all: true } });
    }

}
