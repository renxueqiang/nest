import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter01 implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取请求上下文
    const response = ctx.getResponse(); // 获取 response 对象
    const request = ctx.getRequest(); // 获取 request 对象
    const status = exception.getStatus(); // 获取异常的状态码
    console.log('我是全局过滤器');
    
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message
    });
  }
}

@Catch(HttpException)
export class HttpExceptionFilter02 implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取请求上下文
    const response = ctx.getResponse(); // 获取 response 对象
    const request = ctx.getRequest(); // 获取 request 对象
    const status = exception.getStatus(); // 获取异常的状态码
    console.log('我是局部过滤器');

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}

