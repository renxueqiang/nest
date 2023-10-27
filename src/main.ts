import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import * as session from 'express-session';
import { ConfigResponse } from './config/config.response';
import { ConfigHttpFilter } from './config/config.filter';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfingLogger } from './config/config.logger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: ['http://localhost', 'http://localhost:3000'],
      credentials: true,
    },
    bufferLogs: true,
    logger: new ConfingLogger(),
  });
  // app.useGlobalInterceptors(new ConfigResponse())
  // app.useGlobalFilters(new ConfigHttpFilter())
  await app.listen(3000);
}
bootstrap();













/*

secret                   生成服务端session 签名 可以理解为加盐
name     	               生成客户端cookie 的名字 默认 connect.sid
cookie                   设置返回到前端 key 的属性，默认值为{ path: ‘/’, httpOnly: true, secure: false, maxAge: null }。
rolling	                 在每次请求时强行设置 cookie，这将重置 cookie 过期时间(默认:false)

app.use(
  session({
    secret: 'Noah',
    name: 'cookie_name',
    rolling: true,
    cookie: { maxAge: 1000000 },
    resave: false,
    saveUninitialized: true,
  }),
);

*/

// @Request() 	            req
// @Response()	            res
// @Next()	                next
// @Session()	              req.session
// @Param(key?: string)     req.params/req.params[key]
// @Body(key?: string)	    req.body/req.body[key]
// @Query(key?: string)	    req.query/req.query[key]
// @Headers(name?: string)  req.headers/req.headers[name]
// @HttpCode
