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
    return await this.relationshipRepository
      .createQueryBuilder('relationships')
      .innerJoin('relationships.relationship_type', 'relationship_type')
      .select('relationships.relationship_id', 'relationship_id')
      .addSelect('relationships.from_node_id', 'from_node_id')
      .addSelect('relationships.to_node_id', 'to_node_id')
      .addSelect('relationship_type.type_name', 'relationship_type')
      .getRawMany();
  }

  async findOne(id: number): Promise<Relationship> {
    return await this.relationshipRepository.findOneBy({ relationship_id: id });
  }
}
