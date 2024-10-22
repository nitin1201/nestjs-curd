// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Transform } from 'class-transformer';

// @Schema({
//   toJSON: {
//     getters: true,
//     virtuals: true,
//   },
// })
// export class Users {
//   @Transform(({ value }) => value.toString())
//   _id: string;

//   @Prop()
//   email: string;

//   @Prop()
//   firstname: string;

//   @Prop()
//   lastname: string;

//   @Prop()
//   username: string;

//   @Prop()
//   createdDate: Date;

//   @Prop()
//   modifiedDate: Date;
// }
// export const UsersSchema = SchemaFactory.createForClass(Users);
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Users extends Document {
  @Prop({
    required: true,
    unique: true,
    validate: {
      validator: (v: string) => v.length > 0,
      message: 'Username cannot be empty',
    },
  })
  username: string;

  @Prop({
    required: true,
    unique: true,
    validate: {
      validator: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      message: 'Email is not valid',
    },
  })
  email: string;
  @Prop({
    required: true,
    validate: {
      validator: (v: string) => v.length > 0,
      message: 'Password cannot be empty',
    },
  })
  password: string;
}
export const UsersSchema = SchemaFactory.createForClass(Users);
