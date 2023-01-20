import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NodePropertyValuesService } from './node_property_values.service';
import { NodePropertyValuesResolver } from './node_property_values.resolver';
import { NodePropertyValue } from './node_property_value.entity';
import { VotesModule } from '../votes/votes.module';

@Module({
  imports: [TypeOrmModule.forFeature([NodePropertyValue]), VotesModule],
  providers: [NodePropertyValuesResolver, NodePropertyValuesService],
  exports: [NodePropertyValuesService],
})
export class NodePropertyValuesModule {}
