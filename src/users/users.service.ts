import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dtol';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  private users: any[] = [];
  private readonly logger = new Logger(UsersService.name); // Tạo một logger cho class này

  findAll() {
    return this.userModel.find().exec();
  }

  findOne(userId: string) {
    return this.userModel.findById(userId).exec();
  }

  create({ name }) {
    const newUser = new this.userModel({
      id: uuidv4(), // Tạo ID khi thêm dữ liệu mới
      name,
    });
    newUser.save();
    return { message: 'User created', name };
  }

  delete(id: string) {
    this.userModel.findByIdAndDelete(id);
    return { message: 'User delete', id };
  }

  async edit({ name, id }: UpdateUserDto) {
    this.logger.debug(`Creating user: ${name}`);
    await this.userModel.findByIdAndUpdate(
      id,
      { name },
      { new: true, returnDocument: 'after' },
    );
    return { message: 'User update', id };
  }

  async setUserOnline(username: string, status: boolean): Promise<User | null> {
    return this.userModel.findOneAndUpdate(
      { username },
      { isOnline: status },
      { new: true },
    );
  }
  async getOnlineUser(): Promise<User[]> {
    return this.userModel.find({ isOnline: true }).exec();
  }
}
