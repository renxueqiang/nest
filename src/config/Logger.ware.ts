import {Injectable,NestMiddleware } from '@nestjs/common'
 
import {Request,Response,NextFunction} from 'express'
 
 
@Injectable()
export class LoggerWare implements NestMiddleware{
  use(req:Request,res:Response,next:NextFunction) {
    console.log('-----我是log中间件----')
    next()
  }
}