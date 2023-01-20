import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Vote } from './vote.entity';

@Injectable()
export class VotesService {
  constructor(
    @InjectRepository(Vote)
    private readonly voteRepository: Repository<Vote>,
  ) {}

  async findAll() {
    return await this.voteRepository.find();
  }

  async findOne(id: number) {
    return await this.voteRepository.findOneBy({ id });
  }

  async findOfTable(table_name: string, id: number, up: boolean) {
    return await this.voteRepository
      .createQueryBuilder('votes')
      .innerJoin(
        'ballot_entries',
        'be',
        'be.id=ballot_entry_id and be.row=:row and be.table_name=:table_name',
        {
          row: id,
          table_name,
        },
      )
      .where('votes.up = :up', { up })
      .getCount();
  }
}
