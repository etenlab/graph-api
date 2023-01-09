import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NodeType } from './node_type.entity';

@Injectable()
export class NodeTypesService {
  constructor(
    @InjectRepository(NodeType)
    private readonly nodeTypeRepository: Repository<NodeType>,
  ) {}

  async findAll(): Promise<Array<NodeType>> {
    return await this.nodeTypeRepository.find();
  }
}
