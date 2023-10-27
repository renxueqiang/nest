import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Param,
  Headers,
  HttpCode,
  Inject,
  UseGuards,
  Req,
  Res,
  HttpStatus,
  Injectable
} from '@nestjs/common';
import { HomeService } from './home.service';
import { CreateHomeDto } from './dto/create-home.dto';
import { UpdateHomeDto } from './dto/update-home.dto';
import { Request, Response} from 'express';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get('/test01')
  getHello(@Req() req:Request,@Res({ passthrough: true }) res: Response): string {
    console.log('我是请求参数', req.query);
    console.log('我是请求cookie', req.cookies);
    console.log('我是请求sessionID', req.sessionID);
    console.log('我是请求session', req.session);
    //使用签名的cookie通过下面方式获取
    console.log('signedCookies: ', req.signedCookies);
    // req.session['qqq'] = '12345'
    res.status(HttpStatus.OK);


    //设置cookie
    //参数一表示，cookie名称
    //参数二表示，cookie的值
    //参数三表示，cookie的配置选项
    // domain 域名
    // path 路径
    // expires 过期时间
    // maxAge 有效时间(以毫秒为单位)
    // httpOnly 只能由web服务器访问
    // secure 是否与https一起使用
    // signed 是否签名
    res.cookie('age', '888888888', {path: '/', expires: new Date(Date.now() + 3600 * 1000)});
    res.cookie('name', '9999999999', {maxAge: 3600 * 1000});
    res.cookie('qq', '123',{signed: true})
    
    // console.log('我是请求session', req.session.cookie);
    // console.log('我是请求session', this.shop,this.appService2.getHello());
    // console.log('userService', this.userService.findAll());


    return this.homeService.getHello();
  }
  @Get('/test02')
  getHello02(@Query() query:CreateHomeDto): string {
    console.log('我是请求参数', query);
    return '我是哈哈哈02';
  }

  @Post('/test03')
  getHello03(@Req() req:Request): string {
    console.log('我是请求参数', req.body, req.query);
    console.log('我是请求session', req.headers);

    return '我是哈哈哈03';
  }
  @Post('/test04')
  //@Body('username')
  getHello04(@Body() body:CreateHomeDto): string {
    console.log('我是请求参数', body);
    return '我是哈哈哈04';
  }

  @Get(':idpp')
  // @HttpCode(500)
  findId(@Headers() Head, @Param('idpp') param:String) {
    console.log(Head);
    console.log(param); //{ idpp: 'test09' }
    return {
      code: 200,
    };
  }
}

