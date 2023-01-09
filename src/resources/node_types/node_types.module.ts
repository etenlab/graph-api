import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NodeTypesService } from './node_types.service';
import { NodeTypesResolver } from './node_types.resolver';
import { NodeType } from './node_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NodeType])],
  providers: [NodeTypesResolver, NodeTypesService],
})
export class NodeTypesModule {}
