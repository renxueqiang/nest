
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
@Injectable()
export class TestMiddleware01 implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log('我是局部中间件:请求进入前');
    next();
    console.log('我是局部中间件:请求离开后');
  }
}

//全局中间件只能使用函数模式
export function testMiddleware02(req: Request, res: Response, next: () => void) {
    console.log('我是全局中间件:请求进入前');
    next();
  };
