import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from 'src/entities/users.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Users', schema: UsersSchema }])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
