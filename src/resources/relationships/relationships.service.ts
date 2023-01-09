import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Relationship } from './relationship.entity';

@Injectable()
export class RelationshipsService {
  constructor(
    @InjectRepository(Relationship)
    private readonly relationshipRepository: Repository<Relationship>,
  ) {}

  async findAll(): Promise<Array<Relationship>> {
    return await this.relationshipRepository.find();
  }

  async findOne(id: number): Promise<Relationship> {
    return await this.relationshipRepository.findOneBy({ relationship_id: id });
  }
}
