import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BallotEntry } from './ballot_entry.entity';

@Injectable()
export class BallotEntriesService {
  constructor(
    @InjectRepository(BallotEntry)
    private readonly ballotEntryRepository: Repository<BallotEntry>,
  ) {}

  async findAll() {
    return await this.ballotEntryRepository.find();
  }

  async findOne(id: number) {
    return await this.ballotEntryRepository.findOneBy({ id });
  }
}
