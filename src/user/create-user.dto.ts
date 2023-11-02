import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: '用户名',example: '我是名字', required: true})
  @IsAlphanumeric()
  @MaxLength(5)
  username: string;

  @ApiProperty({ description: '密码' ,example: '我是密码', required: true})
  @IsString({ message: '密码必须是字符串' })
  @IsNotEmpty({ message: '请输入密码' })
  password: string;

  @ApiProperty({ required: false, description: '邮箱',example: '我是邮箱' })
  @IsEmail()
  email: string;

  @ApiProperty({ required: false, description: '年龄',example: '我是年龄' })
  @IsOptional()
  test_age?: number;


  test_age1: number;
  
  test_age2: number;
}
