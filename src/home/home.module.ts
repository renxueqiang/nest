import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { TestMiddleware01 } from 'src/config/config.middleware';

@Module({
  controllers: [HomeController],
  providers: [HomeService],
})


export class HomeModule implements NestModule {

  //forRoutes('home') 拦截这个路径
  //forRoutes({ path: 'home', method: RequestMethod.GET }) 拦截这个路径的get请求
  //forRoutes({ path: '*', method: RequestMethod.ALL }) 星号被用作通配符，将匹配任何字符组合 虽然写在这里却相当于全局的

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TestMiddleware01).forRoutes('home');
  }
}

