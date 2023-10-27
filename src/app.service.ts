import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
 
  getHello(): string {
    // const xiaoman: any = new Xiaoman();
    // console.log(xiaoman.name);
    return '我是哈哈哈01';
  }
}



// @Request() 	            req
// @Response()	            res
// @Next()	                next
// @Session()	              req.session
// @Param(key?: string)     req.params/req.params[key]
// @Body(key?: string)	    req.body/req.body[key]
// @Query(key?: string)	    req.query/req.query[key]
// @Headers(name?: string)  req.headers/req.headers[name]
// @HttpCode



function decotators(target: any) {
  target.prototype.name = '小满';
}

//类装饰器 主要是通过@符号添加装饰器
@decotators
class Xiaoman {
  constructor() {}
}


