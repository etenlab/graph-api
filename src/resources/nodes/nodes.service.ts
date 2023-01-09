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

  async findAll(): Promise<Array<Node>> {
    return await this.nodeRepository.find();
  }

  async findOne(id: number): Promise<Node> {
    return await this.nodeRepository.findOneBy({ node_id: id });
  }
}
