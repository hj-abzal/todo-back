import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {User} from './users.model';
import {CreateUserDto} from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User) {
    }

    async createUser(dto: CreateUserDto): Promise<User> {
        return await this.userRepository.create(dto);
    }

    async getAllUsers(): Promise<User[]>  {
        return this.userRepository.findAll({ include: { all: true } });
    }

    async getUserById(id: number): Promise<User> {
        return this.userRepository.findByPk(id);
    }

    async getByTelegramID(telegramID: number): Promise<User> {
        return this.userRepository.findOne({ where: { telegramID }, include: { all: true } });
    }

}
