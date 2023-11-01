import { Dependencies, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { TradeModule } from './trade/trade.module';
import { HomeModule } from './home/home.module';


@Dependencies(DataSource)
@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'rxq123456',
    database: 'test',
    retryAttempts: 1,
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: true,
  }), TradeModule, HomeModule,UserModule],
  controllers: [AppController]
})

export class AppModule {}

