import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dto/create.UserDto';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  async getAllUsers() {

    return this.usersService.findAll();
  }

  @Post()//add data
  createUser(@Body() createUserDto: createUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Delete(':id') //delete Data
  async deleteUser(@Param('id') id: string): Promise<void> {
    await this.usersService.deleteUser(id);
  }
  @Put(':id')//update data 
  async updateUser(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.usersService.updateUser(id, updateItemDto);
  }
  //get data by id 
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOneById(id);
  }

}
