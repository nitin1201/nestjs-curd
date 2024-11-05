import {
  Injectable,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { createUserDto } from './dto/create.UserDto';
import { InjectModel } from '@nestjs/mongoose';
import { model, Model, models } from 'mongoose';
import { Users } from 'src/entities/users.schema';
import { UpdateItemDto } from './dto/update-item.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import { SignUpDto } from './dto/sign-up.dto';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from 'jwt-decode';
import { error } from 'console';
import { LoginDto } from './dto/LoginDto';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') private readonly userModel: Model<Users>,
    private readonly configService: ConfigService,
  ) {}

  //Add Data in DataBase--*
  // async create(userData: createUserDto): Promise<Users> {
  //   const createUser = new this.userModel(userData);
  //   return await createUser.save();
  // }

  //delete Data--*
  async deleteUser(id: string) {
    const result = await this.userModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return 'User deleted successfully';
  }

  //update data--*
  async updateUser(id: string, updateData: UpdateItemDto): Promise<Users> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return updatedUser;
  }

  //getAll Data from Database--* +pagination for users table
  async findAll(
    page: number = 1,
    limit: number = 6,
  ): Promise<{ id: string; name: string }[]> {
    const skip = (page - 1) * limit;
    const users = await this.userModel.find().skip(skip).limit(limit);
    const userlist = users
      .filter((user) => user.username !== 'ADMIN')
      .map((user) => ({
        id: user._id.toString(),
        name: user.username,
      }));

    return userlist;
  }

  // get data by id--*
  async findOneById(id: string): Promise<Users> {
    const data = await this.userModel.findById(id);
    if (!data) {
      throw new NotFoundException(`Data with ID ${id} not found`);
    }
    return data;
  }

  //sig-up--*service
  async signUp(signUpData: SignUpDto): Promise<{ user: Users; token: string }> {
    const { username, firstname, lastname, email, password, role } = signUpData;
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('User with this email already exists.');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({
      username,
      firstname,
      lastname,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    const jwtSecret = this.configService.get<string>('JWT_SECRET');
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      jwtSecret,
    );
    //Decode__JwtToken_
    let decoded = jwt.decode(token);
    decoded = jwt.decode(token, { complete: true });
    console.log(jwt.decode(token));
    return {
      user: newUser,
      token,
    };
  }

  //log-in--* service
  async login(loginData: LoginDto): Promise<{ message; token: string }> {
    const { email, password } = loginData;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password.');
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid email or password.');
    }
    const jwtSecret = this.configService.get<string>('JWT_SECRET');
    const token = jwt.sign({ userId: user._id, email: user.email }, jwtSecret);
    return {
      message: 'Login successfully 🤖',
      token,
    };
  }

  //delete multipal usersData at a single--*
  async remove(
    ids: string[],
  ): Promise<{ acknowledged: boolean; deletedCount: number }> {
    try {
      const deleteResult = await this.userModel.deleteMany({
        _id: { $in: ids },
      });
      return deleteResult;
    } catch (error) {
      throw new Error('Failed to delete users');
    }
  }

  // Bulk insert in Database -insert multipal data in single time
  // async bulkInsert(user: Users[]): Promise<any> {
  //   return await this.userModel.insertMany(user);
  // }
}
