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

    @Prop()
    email: string;

    @Prop()
    firstname: string;

    @Prop()
    lastname: string;

    /* need to remove start*/
    @Prop()
    username: string;
    /* remove end*/

    @Prop()
    createdDate: Date;

    @Prop()
    modifiedDate: Date;


}

export const UsersSchema = SchemaFactory.createForClass(Users);

