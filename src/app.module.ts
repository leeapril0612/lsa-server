import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BoardModule } from './board/board.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, AuthModule, BoardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
