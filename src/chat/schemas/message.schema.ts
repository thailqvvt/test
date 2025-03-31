import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Message extends Document {
  @Prop({ required: true })
  room: string;

  @Prop({ required: true })
  sender: string;

  @Prop({ required: true })
  content: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
