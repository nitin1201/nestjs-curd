import { Injectable, NotFoundException } from '@nestjs/common';
import { createUserDto } from './dto/create.UserDto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from 'src/entities/users.schema';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('Users') private readonly userModel: Model<Users>) { }
  private users = [];

  // findAll() {
  //   return this.users;
  // }
  async create(userData: createUserDto): Promise<Users> {
    console.log(userData)
    const createUser = new this.userModel(userData);
    const users = await createUser.save();
    return users;
  }
  async deleteUser(id: string) {
    await this.userModel.findByIdAndDelete(id);
    return "user deleted successfully"
  }
  async updateUser(id: string, updateData: UpdateItemDto): Promise<Users> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );
    return updatedUser;
  }

  async findAll(): Promise<Users[]> {
    return this.userModel.find();
  }
  async findOneById(id: string): Promise<Users> {
    const data = await this.userModel.findById(id);
    if (!data) {
      throw new NotFoundException(`Data with ID ${id} not found`);
    }
    return data;
  }
}
