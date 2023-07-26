import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Log} from "./entity/Log.entity";
import {LogController} from "./controllers/log.controller";
import { DataSource } from 'typeorm';

@Module({
  imports: [
      ConfigModule.forRoot({isGlobal: true}),
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT || 3306),
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        synchronize: true,
        "entities"   : [
          "dist/src/entity/**/*.js"
        ],
        "migrations" : [
          "dist/src/migrations/**/*.js"
        ],
        autoLoadEntities: true,
      }),
      TypeOrmModule.forFeature([Log])
  ],
  controllers: [AppController,LogController],
  providers: [
      AppService,
  ],
})
export class AppModule {
}
