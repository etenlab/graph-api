import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NodesService } from './nodes.service';
import { NodesResolver } from './nodes.resolver';
import { Node } from './node.entity';
import { NodePropertyKeysModule } from '../node_property_keys/node_property_keys.module';
import { RelationshipsModule } from '../relationships/relationships.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Node]),
    NodePropertyKeysModule,
    RelationshipsModule,
  ],
  providers: [NodesResolver, NodesService],
})
export class NodesModule {}
