import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nestjs_db'), // Thay đổi URI nếu cần
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
