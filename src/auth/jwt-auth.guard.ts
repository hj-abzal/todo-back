import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {Observable} from 'rxjs';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService
  ) {
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const [baerer, token] = req.headers.authorization.split(" ");

      if (baerer !== "Bearer" || !token) {
        throw new UnauthorizedException({ massage: "Not authorized!" });
      }
      req.user = this.jwtService.verify(token);
      return true;

    } catch (e) {
      throw new UnauthorizedException({ massage: "Not authorized!" });
    }
  }
}