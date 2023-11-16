import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';


//守卫有一个单独的责任。它们根据运行时出现的某些条件（例如权限，角色，访问控制列表等）来确定给定的请求是否由路由处理程序处理。 这通常称为授权
@Injectable()
export class TestGuard01 implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('我是全局守卫', context.getClass().name);

    return true;
  }
}


@Injectable()
export class TestGuard02 implements CanActivate {
  constructor(
    private jwtService: JwtService
  ) { }
  
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    //获取请求，并校验token
    const request = context.switchToHttp().getRequest();
    let headers = request.headers
    console.log(headers);
    console.log(headers.authorization);

    const token = headers.token
    if (!token) {
      throw new UnauthorizedException();
    }
    //验证token或解码获取信息
    const user = await this.jwtService.verifyAsync(token, {
      secret: '1234', // 密钥
    }).catch(() => {
      throw new UnauthorizedException();
    });
    console.log('hhahah2:',user);

    let {nickname} = user
    if (!nickname) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
