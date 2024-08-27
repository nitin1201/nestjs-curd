import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  private readonly users = new Map<string, { password: string }>(); // In-memory user store

  constructor(private readonly jwtService: JwtService) {}

  async signup(username: string, password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 10);
    this.users.set(username, { password: hashedPassword });
    return 'User signed up successfully';
  }

  async login(username: string, password: string): Promise<{ accessToken: string }> {
    this.validateUser(username)
    console.log(`User found: ${username} with hashed password: ${username}`);
    const payload: JwtPayload = { username };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  async validateUser(username: string) {
    const user = this.users.get(username);
    if (user) {
      return { username };
    }
     throw new BadRequestException(`User not found: ${username}`);
  }
}
