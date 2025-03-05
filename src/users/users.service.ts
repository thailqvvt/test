import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users: string[] = [];

  findAll() {
    return this.users;
  }
}
