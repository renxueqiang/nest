import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('主应用')
@Controller()
export class AppController {
  @Get()
  root() {
    return 'Hello World!';

  }
}
