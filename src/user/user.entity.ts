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
  @Column('text')
  mobile: string;

  // 创建时间
  @CreateDateColumn()
  createTime: Date;

  // 更新时间
  @UpdateDateColumn()
  updateTime: Date;

  // 软删除
  @Column({
    default: false,
  })
  isDelete: boolean;

  // 更新次数
  @VersionColumn()
  version: number;

  // 加密盐
  @Column('text', { select: false })
  salt: string;


  @Column()
  test_name: string;

  // @OneToMany(() => Todo, (todo) => todo.author, { cascade: true })
  todos: String[];

  @BeforeInsert()
  private async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
}
