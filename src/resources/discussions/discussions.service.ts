import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Discussion } from './discussion.entity';

@Injectable()
export class DiscussionsService {
  constructor(
    @InjectRepository(Discussion)
    private readonly discussionRepository: Repository<Discussion>,
  ) {}

  async findAll() {
    return await this.discussionRepository.find();
  }

  async findOne(id: number) {
    return await this.discussionRepository.findOneBy({ id });
  }
}
