import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {User, UserResponce} from '../models/users.model';
import {CreateUserDto} from '../dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User) {
    }

    async create(dto: CreateUserDto): Promise<User> {
        return await this.userRepository.create(dto);
    }

    async delete(id: number): Promise<any> {
        return this.userRepository.destroy({where: {id}})
            .then(() => {
                return {message: 'ok', id};
            })
            .catch(() => {
                throw new BadRequestException({in: 'delete'});
            });
    }

    async getById(user_id: number): Promise<UserResponce> {
        const {telegram_id, id, login,} = await this.userRepository.findByPk(user_id);
        return {
            telegram_id, id, login,
        }
    }

    async  getByTelegramID(telegram_id: number): Promise<User> {
        return await this.userRepository.findOne({where: {telegram_id}, include: {all: true}});
    }

}
