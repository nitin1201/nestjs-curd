import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
// import { createUserDto } from './dto/create.UserDto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Users } from 'src/entities/users.schema';
import { SignUpDto } from './dto/sign-up.dto';
import { LoginDto } from './dto/LoginDto';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get('profile')
  async getProfile(@Req() req: Request) {
    return req['user'];
  }

  // getAll Data from Database *+pagination------ http://localhost:4100/users/getAll?page=1&limit=2
  @Get('getAll')
  async getAllUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 6,
  ) {
    return this.usersService.findAll(page, limit);
  }

  //add data *----------localhost:4100/users/postData
  // @Post('postData')
  // createUser(@Body() createUserDto: createUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  //delete Data *----------localhost:4100/users/delete/66cffdaebb898c0061b4672d
  @Delete('delete/:id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    await this.usersService.deleteUser(id);
  }

  //update data  *----------localhost:4100/users/update/67160d66892a638f3df27019
  @Put('update/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateItemDto: UpdateItemDto,
  ) {
    return this.usersService.updateUser(id, updateItemDto);
  }

  // get data by id  *----------localhost:4100/users/6718921ab2938dae8ed8235c
  @Get(':id')
  // @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return this.usersService.findOneById(id);
  }

  //sign-up  *----------localhost:4100/users/signup
  @Post('signup')
  @HttpCode(200)
  async signUp(
    @Body() signUpDto: SignUpDto,
  ): Promise<{ user: Users; token: string }> {
    return this.usersService.signUp(signUpDto);
  }

  //log-in-up

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.usersService.login(loginDto);
  }

  //delete multipalUsersData at a single  *----------localhost:4100/users/delete-many

  @Delete('delete-many')
  @HttpCode(200)
  async deleteMany(@Body('ids') ids: string[]) {
    const result = await this.usersService.remove(ids);
    return { message: 'successfully deleted', result };
  }

  // Bulk insert in Database  *---------http://localhost:4100/users/bulk-insert

  // @Post('bulk-insert')
  // async bulkInsert(@Body() user: Users[]) {
  //   return this.usersService.bulkInsert(user);
  // }

}
