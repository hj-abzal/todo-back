import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from '../users/users.service';
import {JwtService} from '@nestjs/jwt';
import {CreateUserDto} from '../users/dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import {User} from '../users/users.model';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {
    }


    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto);
        return this.generateToken(user);
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.getByTelegramID(userDto.telegram_id);
        if (candidate) {
            throw new HttpException("User with such telegramID already exist", HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.create({ ...userDto, password: hashPassword });

        return this.generateToken(user);
    }

    private async generateToken(user: User) {
        const { telegram_id, id, login } = user;
        return { token: this.jwtService.sign({ telegram_id, id, login  }) };
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getByTelegramID(userDto.telegram_id);
        if (user) {
            const checkPassword = await bcrypt.compare(userDto.password, user.password);
            if (checkPassword) {
                return user;
            }
            throw new UnauthorizedException({ message: "Invalid password" });
        }
        throw new UnauthorizedException({ message: "Invalid telegram_id" });
    }
}
