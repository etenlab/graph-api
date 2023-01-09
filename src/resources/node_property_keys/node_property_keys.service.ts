import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NodePropertyKey } from './node_property_key.entity';

@Injectable()
export class NodePropertyKeysService {
  constructor(
    @InjectRepository(NodePropertyKey)
    private readonly nodePropertyKeyRepository: Repository<NodePropertyKey>,
  ) {}

  async findAll(): Promise<Array<NodePropertyKey>> {
    return await this.nodePropertyKeyRepository.find();
  }

  async findOne(id: number): Promise<NodePropertyKey> {
    return await this.nodePropertyKeyRepository.findOneBy({
      node_property_key_id: id,
    });
  }
}
