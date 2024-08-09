import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dto/create.UserDto';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.findAll();
  }

  @Post()
  createUser(@Body() createUserDto: createUserDto) {
    return this.usersService.create(createUserDto);
  }
 
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    await this.usersService.deleteUser(id);
  }
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.usersService.updateUser(id, updateItemDto);
  }
  
}
