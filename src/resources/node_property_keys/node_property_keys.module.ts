import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NodePropertyKeysService } from './node_property_keys.service';
import { NodePropertyKeysResolver } from './node_property_keys.resolver';
import { NodePropertyKey } from './node_property_key.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NodePropertyKey])],
  providers: [NodePropertyKeysResolver, NodePropertyKeysService],
})
export class NodePropertyKeysModule {}
