import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { UserRole } from 'src/users/dto/sign-up.dto';

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
})
export class Users {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: UserRole })
  role: UserRole;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
