import { Repository } from 'typeorm';
import { Injectable, Inject } from '@nestjs/common';
import { User } from './entities/user.entity';
import { BusinessException } from '@/common/exceptions/business.exception';
import { getUserToken } from '@/helper/gitlab/auth';
@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}
  async createOrSave({ id, ...user }) {
    let data = {};
    try {
      data = id
        ? await this.userRepository.update(id, user)
        : await this.userRepository.save(user);
    } catch (error) {
      throw new BusinessException(error);
    }
    return data;
  }
  async getUserToken(data) {
    const res: any = await getUserToken(data);
    if (res.code !== 0) {
      throw new BusinessException(res.msg);
    }
    return res.data;
  }
  async getTokenByApplications(data) {
    const res: any = await getUserToken(data);
    if (res.code !== 0) {
      throw new BusinessException(res.msg);
    }
    return res.data;
  }
}
