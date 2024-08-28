import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/dto/Login.UserDto';
import { SignupUserDto } from 'src/users/dto/Signup.UserDto'; 

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupUserDto: SignupUserDto) {
    try {
      return await this.authService.signup(signupUserDto.email, signupUserDto.password);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      return await this.authService.login(loginUserDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
