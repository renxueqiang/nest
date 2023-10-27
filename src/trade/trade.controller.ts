import { Controller, Get } from '@nestjs/common';
import { TradeService } from './trade.service';
import { UserService } from 'src/user/user.service';

@Controller('trade')
export class TradeController {
  constructor(private readonly tradeService: TradeService,
    // private readonly userService: UserService,
    ) {}

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }
}
