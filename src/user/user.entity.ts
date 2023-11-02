import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  VersionColumn,
} from 'typeorm';
import * as crypto from 'crypto';
// import { Todo } from '../../todo/entities/todo.entity';

@Entity()
export class User {
  @ApiProperty({ description: '自增 id', example: '我是自增id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '标题', example: '我是标题' })
  @Column({name: '用户名', type: 'text' })
  username: string;

  @ApiProperty({ description: '密码', example: '我是密码' })
  @Column('text', {name:'密码' })
  @Exclude()
  password: string;

  @ApiProperty({ description: '邮箱', example: '我是邮箱' })
  @Column({ length: 500 })
  email: string;

  @ApiProperty({ description: '是否为管理员', example: '我是是否为管理员' })
  @Column('int', { default: 1 })
  is_admin?: number;

  // 手机号
  @Column('text',{ nullable: true })
  mobile?: string;


  // 软删除
  @Column({
    default: false,
  })
  isDelete: boolean;

  // 更新次数
  @VersionColumn()
  version: number;

  // 加密盐
  @Column('text', { select: true , nullable: true})
  salt: string;

  // 创建时间
  @CreateDateColumn()
  createTime: Date;


  @Column({nullable: true})
  test_name: string;

  // @OneToMany(() => Todo, (todo) => todo.author, { cascade: true })
  todos: String[];

  @BeforeInsert()
  private async hashPassword() {
    this.salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, this.salt);
  }
}


export function makeSalt(): string {
  return crypto.randomBytes(3).toString('base64');
}

/**
 * 使用盐加密明文密码
 * @param password 密码
 * @param salt 密码盐
 */
export function encryptPassword(password: string, salt: string): string {
  if (!password || !salt) {
    return '';
  }
  const tempSalt = Buffer.from(salt, 'base64');
  return (
    // 10000 代表迭代次数 16代表长度
    crypto.pbkdf2Sync(password, tempSalt, 10000, 16, 'sha1').toString('base64')
  );
}
