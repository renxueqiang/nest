import { HeadersDefaults } from './../node_modules/axios/index.d';
import {
  Controller,
  Get,
  Query,
  Request,
  Response,
  Post,
  Body,
  Param,
  Headers,
  HttpCode,
  Inject,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AppService2 } from './app.service2';
import { UserService } from './user/user.service';
import { ConfigModule } from './config/config.module';

@Controller({
  path: 'home',
  // version: '1',
})
export class AppController {
  constructor(
    @Inject('Ren') private readonly appService: AppService,
    @Inject('JD') private shop: String[],
    @Inject('Ren2') private appService2: AppService2,
    private readonly userService: UserService,
  ) {}

  @Get('/test01')
  getHello(@Request() req): string {
    console.log('我是请求参数', req.query);
    console.log('我是请求session', req.session.cookie);
    console.log('我是请求session', this.shop,this.appService2.getHello());

    console.log('userService', this.userService.findAll());


    // return this.appService.getHello();
    return '我是哈哈哈01';
  }
  @Get('/test02')
  getHello02(@Query() query): string {
    console.log('我是请求参数', query);
    return '我是哈哈哈02';
  }

  @Post('/test03')
  getHello03(@Request() req): string {
    console.log('我是请求参数', req.body, req.query);
    console.log('我是请求session', req.session);

    return '我是哈哈哈03';
  }
  @Post('/test04')
  //@Body('username')
  getHello04(@Body() body): string {
    console.log('我是请求参数', body);
    return '我是哈哈哈04';
  }

  @Get(':idpp')
  // @HttpCode(500)
  findId(@Headers() Head, @Param() param) {
    // console.log(Head);
    console.log(param); //{ idpp: 'test09' }
    return {
      code: 200,
    };
  }
}
