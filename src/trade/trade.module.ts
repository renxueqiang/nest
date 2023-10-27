import { Module } from '@nestjs/common';
import { TradeService } from './trade.service';
import { TradeController } from './trade.controller';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { UserController } from 'src/user/user.controller';

@Module({
  controllers: [TradeController],
  providers: [TradeService],
})
export class TradeModule {}

