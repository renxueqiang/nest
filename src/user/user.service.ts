import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly jwtService: JwtService

  ) {}

  // 校验注册信息
  async checkUser(registerDTO: CreateUserDto): Promise<any> {
    const { username } = registerDTO;
    const hasUser = await this.userRepository.findOneBy({ username });
    if (hasUser) {
      throw new NotFoundException('用户已存在');
    }
  }

  //注册用户
  async create(createUserDto: CreateUserDto) {
    await this.checkUser(createUserDto);

    const { username, password, email } = createUserDto;
    const user = new User();
    user.username = username;
    user.password = password;
    user.email = email;
    user.is_admin = 1;

    return this.userRepository.save(user);
  }


  //用户登录
  async findByUsernameAndPassword(username: string,password:string) {
    const user = await this.userRepository.findOne({
      where: { username},
    });
    console.log('8888888888:',user);
    
    if (!user) {
      throw new NotFoundException('用户不存在')
    }

    const currentHashPassword = await bcrypt.hash(password, user.salt);
    if (currentHashPassword !== user.password) {
      throw new NotFoundException('密码错误')
    }

    const token = await this.certificate(user)
    return {token: token}
  }

    // 生成 token
    async certificate(user: User) {
      const payload = { 
        id: user.id,
        nickname: user.username,
        mobile: user.mobile,
      };
      const token = this.jwtService.sign(payload);
      return token
    }
  
  

  async findAll() {
    return this.userRepository.find();
  }

  async findMore(page: number = 1, pageSize: number = 10) {
    return this.userRepository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }

  async findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async findByUsername(username: string) {
    return this.userRepository.findOne({
      where: { username },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { username, password, email } = updateUserDto;

    return this.userRepository.update({ id }, { username, password, email });
  }

  async remove(id: number) {
    return this.userRepository.delete({
      id,
    });
  }

  async checkAdmin(id: number) {
    return this.userRepository.findOne({
      where: { id, is_admin: 1 },
    });
  }
}
