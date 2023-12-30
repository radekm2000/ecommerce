import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from 'src/utils/dtos/user.dto';
import { User } from 'src/utils/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findUser({
    username,
    email,
    id,
  }: {
    username?: string;
    email?: string;
    id?: number;
  }): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { username: username, email: email, id: id },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async register(dto: RegisterUserDto): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: { username: dto.username, email: dto.email },
    });

    if (existingUser) {
      if (existingUser.username === dto.username) {
        throw new HttpException(
          `username ${dto.username} already exists`,
          HttpStatus.CONFLICT,
        );
      } else if (existingUser.email === dto.email) {
        throw new HttpException(
          `An email has already been taken`,
          HttpStatus.CONFLICT,
        );
      }
    }

    const newUser = this.usersRepository.create(dto);
    return await this.usersRepository.save(newUser);
  }
}
