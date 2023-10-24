import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import * as session from 'express-session';

const whiteList = ['/list']


function middleWareAll  (req,res,next) {
   
  console.log('我是全局的中间件:',req.originalUrl)
  next()
}




async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.use(
    session({
      secret: 'Ren',
      name: 'ren_session',
      rolling: true,
      cookie: { maxAge: 1000000 },
      resave: false,
      saveUninitialized: true,
    }),
  );
  app.use(middleWareAll);
  await app.listen(3000);
}
bootstrap();

// secret                   生成服务端session 签名 可以理解为加盐
// name     	              生成客户端cookie 的名字 默认 connect.sid
// cookie                   设置返回到前端 key 的属性，默认值为{ path: ‘/’, httpOnly: true, secure: false, maxAge: null }。
// rolling	                在每次请求时强行设置 cookie，这将重置 cookie 过期时间(默认:false)
