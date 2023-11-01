import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface data<T> {
  data: T;
}

//全局使用
@Injectable()
export class TestInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('我是全局拦截器:控制器名字', context.getClass().name);
    // console.log('我是拦截器', context.getHandler());
    return next.handle().pipe(
      map((data) => {
        return {
          data,
          status: 0,
          success: true,
          message: '牛逼',
        };
      }),
    );
  }
}

@Injectable()
export class TestInterceptor02 implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('我是局部拦截器哈哈:控制器名字', context.getClass().name);
    return next.handle();
  }
}
