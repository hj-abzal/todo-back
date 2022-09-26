import {Body, Controller, Get, Post, Query} from '@nestjs/common';
import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';

@Controller("users")
export class UsersController {
    constructor(private userService: UsersService) {
    }

    @Post()
    createUser(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto);
    }

    @Get()
    getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Get()
    getByTelegramID(@Query('telegramID') id: string) {
        return this.userService.getUserByTelegramID(+id);
    }
}
