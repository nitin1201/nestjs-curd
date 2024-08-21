import { Module, Options } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from 'src/entities/users.schema';
import { UsersModule } from './users/users.module';


// import { bookcontroller } from './app.controller';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: [".local.env"]
  }),
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (ConfigService : ConfigService)=> ({uri:ConfigService.get("MONGO_URI") }),
    inject: [ConfigService]
  }),
  MongooseModule.forFeature([{  name: 'Users', schema: UsersSchema }]),
  UsersModule,
  AuthModule 
  ],
  controllers: [],
  providers: [],
})
export class appModule {

}

