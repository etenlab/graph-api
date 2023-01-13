import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Node } from './node.entity';

@Injectable()
export class NodesService {
  constructor(
    @InjectRepository(Node)
    private readonly nodeRepository: Repository<Node>,
  ) {}

  async findAll({ search }: { search?: string }): Promise<Array<Node>> {
    const querBuilder = this.nodeRepository
      .createQueryBuilder('nodes')
      .innerJoin('nodes.node_type', 'node_type')
      .select('nodes.node_id', 'node_id')
      .addSelect('node_type.type_name', 'node_type');

    if (search) {
      const parameters = {
        search: `%${search.toLowerCase()}%`,
      };
      querBuilder
        .leftJoin('node_property_keys', 'npk', 'npk.node_id=nodes.node_id')
        .leftJoin(
          'node_property_values',
          'npv',
          'npv.node_property_key_id=npk.node_property_key_id',
        )
        .where('nodes.node_type like :search', parameters)
        .orWhere(
          "LOWER(npv.property_value->>'value') like :search",
          parameters,
        );
    }

    return await querBuilder.getRawMany();
  }

  async findOne(node_id: number): Promise<Node> {
    return await this.nodeRepository
      .createQueryBuilder('nodes')
      .innerJoin('nodes.node_type', 'node_type')
      .select('nodes.node_id', 'node_id')
      .addSelect('node_type.type_name', 'node_type')
      .where('nodes.node_id = :node_id', { node_id })
      .getRawOne();
  }
}
