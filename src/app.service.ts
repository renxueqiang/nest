import { Injectable } from '@nestjs/common';
import axios from 'axios';

const Get = (url: string): MethodDecorator => {
  return (target, key, descriptor: PropertyDescriptor) => {
    const fnc = descriptor.value;
    axios
      .get(url)
      .then((res) => {
        fnc(res, {
          status: 200,
        });
      })
      .catch((e) => {
        fnc(e, {
          status: 500,
        });
      });
  };
};

@Injectable()
export class AppService {
  @Get('https://api.apiopen.top/api/getHaoKanVideo?page=0&size=10')
  getList(res: any, status: any) {
    // console.log(res.data.result.list, status);
  }

  getHello(): string {
    const xiaoman: any = new Xiaoman();
    // console.log(xiaoman.name);
    return 'Hello World!tttttttttttt';
  }
}

function decotators(target: any) {
  target.prototype.name = '小满';
}

//类装饰器 主要是通过@符号添加装饰器
@decotators
class Xiaoman {
  constructor() {}
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
