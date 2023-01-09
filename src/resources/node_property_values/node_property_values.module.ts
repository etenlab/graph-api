import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NodePropertyValuesService } from './node_property_values.service';
import { NodePropertyValuesResolver } from './node_property_values.resolver';
import { NodePropertyValue } from './node_property_value.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NodePropertyValue])],
  providers: [NodePropertyValuesResolver, NodePropertyValuesService],
})
export class NodePropertyValuesModule {}
