import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NodesService } from './nodes.service';
import { NodesResolver } from './nodes.resolver';
import { Node } from './node.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Node])],
  providers: [NodesResolver, NodesService],
})
export class NodesModule {}
