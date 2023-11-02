import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Req,
  Query,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
// import { Roles } from '../roles/roles.decorator';
// import { Role } from '../roles/roles.interface';
// import { RolesGuard } from '../auth/guards/roles.guard';
import { User } from './user.entity';
import { query } from 'express';
import { TestPipe02 } from 'src/config/config.pipe';
import { TestGuard02 } from 'src/config/config.guard';

@ApiTags('用户详情')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBody({ type: CreateUserDto ,description: '我要创建用户'})
  @ApiResponse({ type: User ,description: '创建用户成功',})
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(TestPipe02)  //局部管道
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiResponse({ type: [User] })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(TestGuard02) //局部守卫
  @Get('all')
  async findAll() {
    return this.userService.findAll();
  }


  @Get('more')
  async findMore(@Query('page') page: number,@Query('pageSize') pageSize: number,) {
    return this.userService.findMore(page,pageSize);
  }

  @Get('login')
  async login(@Query('name') name: string,@Query('password') password: string,) {
    return this.userService.findByUsernameAndPassword(name,password);
  }

  @ApiResponse({ type: User })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string) {
    return this.userService.findOne(+id);
  }

  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ type: User })
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: string) {
    return this.userService.remove(+id);
  }
}
