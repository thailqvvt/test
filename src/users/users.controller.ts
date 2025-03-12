import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.findAll();
  }

  @Get(':id')
  getUsers(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createUsers(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }
  @Delete()
  deleteUsers(@Param() id: string) {
    return this.usersService.delete(id);
  }

  @Put()
  editUsers(@Body() body: { name: string; id: string }) {
    return this.usersService.edit(body);
  }
}
