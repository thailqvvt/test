import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './schemas/message.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Message.name) private readonly messageModel: Model<Message>,
  ) {}

  async saveMessage(
    room: string,
    sender: string,
    content: string,
  ): Promise<Message> {
    const message = new this.messageModel({ room, sender, content });
    return message.save();
  }

  async getMessages(room: string): Promise<Message[]> {
    return this.messageModel.find({ room }).sort({ createdAt: 1 }).exec();
  }
}
