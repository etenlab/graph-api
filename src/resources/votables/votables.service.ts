import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Votable } from './votable.entity';

@Injectable()
export class VotablesService {
  constructor(
    @InjectRepository(Votable)
    private readonly votableRepository: Repository<Votable>,
  ) {}

  async findAll(): Promise<Array<Votable>> {
    return await this.votableRepository.find();
  }
}
