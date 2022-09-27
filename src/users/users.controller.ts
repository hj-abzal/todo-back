import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {User} from './users.model';
import {JwtAuthGuard} from '../auth/jwt-auth.guard';

@ApiTags('Users')
@Controller("users")
export class UsersController {
    constructor(private userService: UsersService) {
    }

    @ApiOperation({summary: 'Create new user'})
    @ApiResponse({status: 200, type: User})
    @Post()
    createUser(@Body() userDto: CreateUserDto) {
        return this.userService.create(userDto);
    }

    @ApiOperation({summary: 'Get all users'})
    @ApiResponse({status: 200, type: [User]})
    @UseGuards(JwtAuthGuard)
    @Get()
    getAllUsers() {
        return this.userService.getAll();
    }

    @ApiOperation({summary: 'Get one user by id'})
    @ApiResponse({status: 200, type: User})
    @Get('/:id')
    getUserById(@Param('id') id: number) {
        return this.userService.getById(id);
    }
}
