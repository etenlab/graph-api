import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RelationshipPropertyKey } from './relationship_property_key.entity';

@Injectable()
export class RelationshipPropertyKeysService {
  constructor(
    @InjectRepository(RelationshipPropertyKey)
    private readonly relationshipPropertyKeyRepository: Repository<RelationshipPropertyKey>,
  ) {}

  async findAll(): Promise<Array<RelationshipPropertyKey>> {
    return await this.relationshipPropertyKeyRepository.find();
  }

  async findOne(id: number): Promise<RelationshipPropertyKey> {
    return await this.relationshipPropertyKeyRepository.findOneBy({
      relationship_property_key_id: id,
    });
  }
}
