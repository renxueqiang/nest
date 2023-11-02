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

@ApiTags('用户详情')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBody({ type: CreateUserDto ,description: '我要创建用户'})
  @ApiResponse({ type: User ,description: '创建用户成功',})
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiResponse({ type: [User] })
  // @Roles(Role.Admin)
  // @UseGuards(RolesGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll() {
    return this.userService.findAll();
  }


  @Get('more')
  async findMore(@Query('page') page: number,@Query('pageSize') pageSize: number,) {
    return this.userService.findMore(page,pageSize);
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
