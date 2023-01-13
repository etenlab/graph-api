import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';

import { RelationshipPropertyValue } from './relationship_property_value.entity';

@Injectable()
export class RelationshipPropertyValuesService {
  constructor(
    @InjectRepository(RelationshipPropertyValue)
    private readonly relationshipPropertyValue: Repository<RelationshipPropertyValue>,
  ) {}

  async findAll(
    options?: FindManyOptions<RelationshipPropertyValue>,
  ): Promise<Array<RelationshipPropertyValue>> {
    return await this.relationshipPropertyValue.find(options);
  }

  async findOne(id: number): Promise<RelationshipPropertyValue> {
    return await this.relationshipPropertyValue.findOneBy({
      relationship_property_value_id: id,
    });
  }
}
