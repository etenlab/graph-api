import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';

import { NodePropertyValue } from './node_property_value.entity';
import { CreateNodePropertyValueInput } from './dto/create-node-property-value.input';

@Injectable()
export class NodePropertyValuesService {
  constructor(
    @InjectRepository(NodePropertyValue)
    private readonly nodePropertyValueRepository: Repository<NodePropertyValue>,
  ) {}

  async create({
    node_property_key_id,
    property_value,
  }: CreateNodePropertyValueInput) {
    const result = await this.nodePropertyValueRepository
      .createQueryBuilder()
      .insert()
      .into(NodePropertyValue)
      .values([
        {
          node_property_key_id,
          property_value: () =>
            `json_build_object('value', '${property_value}')`,
        },
      ])
      .returning('node_property_value_id::int as node_property_value_id')
      .execute();

    return await this.findOne(result.raw[0].node_property_value_id);
  }

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
