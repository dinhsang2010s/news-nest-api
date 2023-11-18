import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, SchemaOptions } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { PostModule } from './modules/post/post.module';

const options: SchemaOptions = {
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
    },
  },
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('DB_URI'),
        dbName: config.get<string>('DB_NAME'),
        connectionFactory: (connection) => {
          connection.plugin((schema) => {
            schema.options.toJSON = {
              virtuals: true,
              versionKey: false,
              transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
              },
            };
          });
          return connection;
        },
      }),
    }),
    // ThrottlerModule.forRoot([
    //   {
    //     ttl: 60000,
    //     limit: 10,
    //   },
    // ]),
    AuthModule,
    UserModule,
    CategoryModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
