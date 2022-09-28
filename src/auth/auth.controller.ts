import {Body, Controller, Delete, Get, Post, Req, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {CreateUserDto} from './dto/create-user.dto';
import {AuthService} from './services/auth.service';
import {JwtAuthGuard, UserRequestType} from './jwt-auth.guard';
import {UsersService} from './services/users.service';
import {User} from './models/users.model';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UsersService
    ) {
    }

    @ApiOperation({summary: 'Login to back'})
    @ApiResponse({status: 200, type: User})
    @Post("/login")
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto);
    }

    @ApiOperation({summary: 'logout from project'})
    @ApiResponse({status: 200})
    @Delete("/login")
    @UseGuards(JwtAuthGuard)
    logout(@Req() req: UserRequestType) {
        return this.authService.logout(req.user);
    }

    @ApiOperation({summary: 'registration to project'})
    @ApiResponse({status: 200, type: User})
    @Post("/registration")
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto);
    }

    @ApiOperation({summary: 'Check if token still works'})
    @ApiResponse({status: 200})
    @Get("/me")
    @UseGuards(JwtAuthGuard)
    me(@Req() req: UserRequestType) {
        return this.userService.getById(req.user.id);
    }
}
