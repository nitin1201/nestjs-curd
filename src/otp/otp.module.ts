import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OtpService } from './otp.service';
import { OtpSchema } from 'src/entities/otp.schema';
import { OtpController } from './otp.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Otp', schema: OtpSchema }]),
  ],
  providers: [OtpService],
  controllers: [OtpController],
  exports: [OtpService],
})
export class OtpModule {}
