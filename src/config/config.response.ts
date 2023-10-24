import { Injectable, NestInterceptor, CallHandler } from '@nestjs/common'
import { map } from 'rxjs/operators'
import {Observable} from 'rxjs'
 
interface data<T>{
    data:T
}
 
@Injectable()
export class ConfigResponse<T = any> implements NestInterceptor {
    intercept(context, next: CallHandler):Observable<data<T>> {
        return next.handle().pipe(map(data => {
            return {
               data,
               status:0,
               success:true,
               message:"牛逼"
            }
        }))
    }
}