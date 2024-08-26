import { Injectable, UnauthorizedException } from '@nestjs/common';
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
    const Users = this.users.get(username);
  if (!this.users) {
    console.error(`User not found: ${username}`);
    throw new UnauthorizedException('Invalid credentials');
    }
    console.log(`User found: ${username} with hashed password: ${username}`);
    const payload: JwtPayload = { username };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  async validateUser(payload: JwtPayload): Promise<{ username: string } | null> {
    const user = this.users.get(payload.username);
    if (user) {
      return { username: payload.username };
    }
    return null;
  }
}
