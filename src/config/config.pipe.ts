import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class TestPipe01 implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value;
  }
}


@Injectable()
export class TestPipe02 implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value;
  }
}

