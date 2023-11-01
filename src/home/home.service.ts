import { Injectable } from '@nestjs/common';

@Injectable()
export class HomeService {
  create(createHomeDto: String) {
    return 'This action adds a new home';
  }

  findAll() {
    return `This action returns all home`;
  }

  findOne(id: number) {
    return `This action returns a #${id} home`;
  }

  update(id: number, updateHomeDto: String) {
    return `This action updates a #${id} home`;
  }

  remove(id: number) {
    return `This action removes a #${id} home`;
  }
  getHello() {
    return `This action removes a  home`;
  }
}
