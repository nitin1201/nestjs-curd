import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';

@Schema({
    toJSON: {
        getters: true,
        virtuals: true,
    },
})
export class Users {
    @Transform(({ value }) => value.toString())
    _id: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop()
    firstname: string;

    @Prop()
    lastname: string;

    @Prop({ required: true })
    password: string; // Add this field for storing hashed passwords

    @Prop()
    createdDate: Date;

    @Prop()
    modifiedDate: Date;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
