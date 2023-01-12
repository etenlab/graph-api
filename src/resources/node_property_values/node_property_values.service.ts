import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';

import { NodePropertyValue } from './node_property_value.entity';

@Injectable()
export class NodePropertyValuesService {
  constructor(
    @InjectRepository(NodePropertyValue)
    private readonly nodePropertyValueRepository: Repository<NodePropertyValue>,
  ) {}

  async findAll(
    options?: FindManyOptions<NodePropertyValue>,
  ): Promise<Array<NodePropertyValue>> {
    return await this.nodePropertyValueRepository.find(options);
  }

  async findOne(id: number): Promise<NodePropertyValue> {
    return await this.nodePropertyValueRepository.findOneBy({
      node_property_value_id: id,
    });
  }
}
