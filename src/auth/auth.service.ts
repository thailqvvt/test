import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(username: string, password: string) {
    if (username !== 'admin' || password !== 'password') {
      throw new UnauthorizedException('Sai tài khoản hoặc mật khẩu');
    }

    const payload = { username };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }
}
