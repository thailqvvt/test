import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Request } from 'express';

export interface RequestWithUser extends Request {
  user?: any;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Bạn chưa đăng nhập!');
    }
    const token = authHeader.split(' ')[1];

    try {
      const payload = this.jwtService.verify(token); // Xác minh JWT
      request.user = payload; // Lưu user vào request
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token không hợp lệ!');
    }
  }
}
