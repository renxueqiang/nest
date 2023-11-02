import { ArgumentMetadata, Injectable, PipeTransform,BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';




@Injectable()
export class TestPipe01 implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value;
  }
}

// 管道有两个类型:
// 转换：管道将输入数据转换为所需的数据输出；
// 验证：对输入数据进行验证，如果验证成功继续传递，验证失败则抛出异常；

@Injectable()
export class TestPipe02 implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    console.log(`----------hahahah:value:`, value, 'metatype: ', metatype);
    if (!metatype || !this.toValidate(metatype)) {
      // 如果没有传入验证规则，则不验证，直接返回数据
      return value;
    }
    // 将对象转换为 Class 来验证
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      const msg = Object.values(errors[0].constraints)[0]; // 只需要取第一个错误信息并返回即可
      console.log(`Validation failed: ${msg}`);
      throw new BadRequestException(`Validation failed: ${msg}`);
    }
    return value;
  }

  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
