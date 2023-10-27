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



// import { Module } from '@nestjs/common';
// import { UserService } from './user.service';
// import { UserController } from './user.controller';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from './entities/user.entity';

// @Module({
//   imports: [TypeOrmModule.forFeature([User])],
//   controllers: [UserController],
//   providers: [UserService],
//   exports: [UserService] //导出
// })
// export class UserModule {}
