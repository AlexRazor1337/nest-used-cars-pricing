import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    const user = new User();
    Object.assign(user, createUserDto);

    return this.userRepository.save(user);
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  findAll() {
    return this.userRepository.find();
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async update(id: string, updateUserDto: Partial<CreateUserDto>) {
    const user = await this.userRepository.findOne({
      where: { id: parseInt(id) },
    });
    
    if (!user) {
      throw new NotFoundException('User not found');
    }
    
    Object.assign(user, updateUserDto);

    return this.userRepository.save(user);
  }
}
