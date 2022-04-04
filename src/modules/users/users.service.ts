import { Injectable, Inject } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/constants/constants';
import { Repository } from 'typeorm';
import { UserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: Repository<User>,
  ) {}

  async createUser(userDto: UserDto) {
    const user = new User();
    user.username = userDto.username;
    user.password = userDto.password;
    const entity = this.userRepository.create(user);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = await this.userRepository.save(entity);
    return result;
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username: username } });
  }
}
