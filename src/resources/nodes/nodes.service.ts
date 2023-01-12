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
    const querBuilder = await this.nodeRepository
      .createQueryBuilder('nodes')
      .innerJoin('nodes.node_type', 'node_type')
      .select('nodes.node_id', 'node_id')
      .addSelect('node_type.type_name', 'node_type');

    if (search) {
      querBuilder.where('nodes.node_type like :search', {
        search: `%${search}%`,
      });
    }

    return querBuilder.getRawMany();
  }

  async findOne(id: number): Promise<Node> {
    return await this.nodeRepository.findOneBy({ node_id: id });
  }
}
