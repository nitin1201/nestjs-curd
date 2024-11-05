import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type productsDocument = products & Document;

@Schema({ collection: 'products' })
export class products {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  image:string;

  @Prop()
  price:string;

  @Prop()
  category:string;

}
export const productsSchema = SchemaFactory.createForClass(products);
