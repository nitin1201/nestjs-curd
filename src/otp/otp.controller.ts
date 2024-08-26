import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { OtpService } from './otp.service';

@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post('generate')
  async generateOtp(@Body() body: { userId: string }) {
    const { userId } = body;
    const otp = await this.otpService.generateOtp(userId);
    return { otp };
  }

  @Post('verify')
  async verifyOtp(@Body() body: { userId: string; otp: string }) {
    const { userId, otp } = body;
    const isValid = await this.otpService.verifyOtp(userId, otp);
    return { isValid };
  }

  @Get('latest/:userId')
  async getOtpByUserId(@Param('userId') userId: string) {
    const otp = await this.otpService.getOtpByUserId(userId);
    return { otp };
  }
}
