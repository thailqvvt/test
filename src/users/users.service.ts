import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  private users: any[] = [];

  findAll() {
    return this.users;
  }

  create({ name }) {
    const newUser = {
      id: uuidv4(), // Tạo ID khi thêm dữ liệu mới
      name,
    };
    this.users.push(newUser);
    return { message: 'User created', name };
  }

  edit({ name, id }) {
    let temp: { id: string; name: string }[] = [...this.users];
    const idx = temp.findIndex((e) => e.id === id);
    temp[idx] = { id, name };
    this.users = temp;
    return { message: 'User update', id };
  }
}
