import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nestjs_db'),
    AuthModule, // Thay đổi URI nếu cần
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
