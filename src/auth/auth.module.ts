import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './services/auth.service';
import {JwtModule} from '@nestjs/jwt';
import {UsersService} from './services/users.service';
import {SequelizeModule} from '@nestjs/sequelize';
import {User} from './models/users.model';

@Module({
    controllers: [AuthController],
    providers: [AuthService, UsersService],
    imports: [
        SequelizeModule.forFeature([User]),
        JwtModule.register({
            secret: process.env.PRIVATE_KEY || 'SECRET',
            signOptions: {
                expiresIn: '24h'
            }
        })
    ],
    exports: [JwtModule]
})
export class AuthModule {
}
