import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import * as speakeasy from 'speakeasy';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Otp } from 'src/entities/otp.schema';

@Injectable()
export class OtpService {
  constructor(
    @InjectModel('Otp') private readonly otpModel: Model<Otp>,
  ) {}

  async generateOtp(userId: string): Promise<string> {
    const otp = speakeasy.totp({
      secret: process.env.OTP_SECRET,
      encoding: 'base32',
    });

    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 5);

    const otpRecord = new this.otpModel({
      userId,
      otp,
      createdAt: new Date(),
      expiresAt,
    });

    await otpRecord.save();

    return otp;
  }

  async verifyOtp(userId: string, otp: string): Promise<boolean> {
    const otpRecord = await this.otpModel.findOne({ userId });

    if (!otpRecord || otpRecord.expiresAt < new Date()) {
      throw new NotFoundException('OTP not found or expired.');
    }

    const isValid = speakeasy.totp.verify({
      secret: process.env.OTP_SECRET,
      encoding: 'base32',
      token: otp,
      window: 1,
    });

    if (!isValid) {
      throw new BadRequestException('Invalid OTP.');
    }

    await this.otpModel.deleteOne({ userId });

    return isValid;
  }

  // Method to get the latest OTP by userId
  async getOtpByUserId(userId: string): Promise<string> {
    const otpRecord = await this.otpModel.findOne({ userId }).sort({ createdAt: -1 });

    if (!otpRecord) {
      throw new NotFoundException('OTP not found for the specified user.');
    }

    return otpRecord.otp;
  }
}
