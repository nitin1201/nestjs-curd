import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  private readonly users = new Map<string, { password: string }>(); // This is a simple in-memory store

  constructor(private readonly jwtService: JwtService) {}

  async signup(username: string, password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 10);
    this.users.set(username, { password: hashedPassword });
    return 'User signed up successfully';
  }

  async login(username: string, password: string): Promise<{ accessToken: string }> {
    const user = this.users.get(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }

    const payload = { username };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    const user = this.users.get(payload.username);
    if (user) {
      return { username: payload.username };
    }
    return null;
  }
}
