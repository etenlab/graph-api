import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';

import { NodePropertyKey } from './node_property_key.entity';

@Injectable()
export class NodePropertyKeysService {
  constructor(
    @InjectRepository(NodePropertyKey)
    private readonly nodePropertyKeyRepository: Repository<NodePropertyKey>,
  ) {}

  async findAll(
    options?: FindManyOptions<NodePropertyKey>,
  ): Promise<Array<NodePropertyKey>> {
    return await this.nodePropertyKeyRepository.find(options);
  }

  async findOne(id: number): Promise<NodePropertyKey> {
    return await this.nodePropertyKeyRepository.findOneBy({
      node_property_key_id: id,
    });
  }
}
