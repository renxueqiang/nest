import { Dependencies, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from './config/config.module';
import { LoggerWare } from './config/Logger.ware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './user/user.entity';
import { TradeModule } from './trade/trade.module';
import { HomeModule } from './home/home.module';


@Dependencies(DataSource)
@Module({
  imports: [ConfigModule.forRoot({
    path: '/ren'
  }),  TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'rxq123456',
    database: 'test',
    retryAttempts: 1,
    entities: [User],
    synchronize: true,
  }), TradeModule, HomeModule,UserModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}

