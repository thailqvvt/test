import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { UsersService } from '../users/users.service';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly chatService: ChatService,
    private readonly userService: UsersService,
  ) {}

  async handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    const username = client.handshake.query.username as string;
    await this.userService.setUserOnline(username, true);
    const onlineUsers = this.userService.getOnlineUser();
    client.emit('online user', onlineUsers);
  }

  async handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    const username = client.handshake.query.username as string;
    await this.userService.setUserOnline(username, false);
    const users = await this.userService.getOnlineUser();

    this.server.emit(
      'message',
      `User ${client.id} has left the chat, online user` + users,
    );
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @MessageBody() room: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(room);
    console.log(`Client ${client.id} joined room: ${room}`);
    const messages = await this.chatService.getMessages(room);
    client.emit('messageHistory', messages);
  }

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() payload: { room: string; sender: string; content: string },
    @ConnectedSocket() client: Socket,
  ) {
    const { room, sender, content } = payload;
    const message = await this.chatService.saveMessage(room, sender, content);
    this.server.to(room).emit('message', message);
  }
}
