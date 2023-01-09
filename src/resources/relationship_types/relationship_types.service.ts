import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RelationshipType } from './relationship_type.entity';

@Injectable()
export class RelationshipTypesService {
  constructor(
    @InjectRepository(RelationshipType)
    private readonly relationshipTypeRepository: Repository<RelationshipType>,
  ) {}

  async findAll(): Promise<Array<RelationshipType>> {
    return await this.relationshipTypeRepository.find();
  }
}
