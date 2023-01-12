import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NodePropertyKeysService } from './node_property_keys.service';
import { NodePropertyKeysResolver } from './node_property_keys.resolver';
import { NodePropertyKey } from './node_property_key.entity';
import { NodePropertyValuesModule } from '../node_property_values/node_property_values.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([NodePropertyKey]),
    NodePropertyValuesModule,
  ],
  providers: [NodePropertyKeysResolver, NodePropertyKeysService],
  exports: [NodePropertyKeysService],
})
export class NodePropertyKeysModule {}
