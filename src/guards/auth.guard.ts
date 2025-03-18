import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuards implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeaders = request.headers.authorization;

    if (!authHeaders || !authHeaders.startsWith('Bearer ')) {
      throw new UnauthorizedException('Bạn chưa đăng nhập!');
    }

    const token = authHeaders.split(' ')[1];

    if (token !== 'my-secret-token') {
      throw new UnauthorizedException('Token không hợp lệ');
    }

    return true;
  }
}
