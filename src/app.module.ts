import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from 'src/entities/users.schema';
import { UsersModule } from './users/users.module';
import { Category, CategorySchema } from './category/category.schema';
import { CategoryModule } from './category/category.module';
import { products, productsSchema } from './products/products.Schema';
import { ProductsModule } from './products/products.modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.local.env'],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: 'Users', schema: UsersSchema }]),
    MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]),
    MongooseModule.forFeature([{ name: products.name, schema: productsSchema }]),

    UsersModule,
    CategoryModule,
    ProductsModule,
  ],
  providers: [],
})
export class AppModule {}
