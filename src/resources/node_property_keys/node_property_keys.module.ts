import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NodePropertyKeysService } from './node_property_keys.service';
import { NodePropertyKeysResolver } from './node_property_keys.resolver';
import { NodePropertyKey } from './node_property_key.entity';
import { NodePropertyValuesModule } from '../node_property_values/node_property_values.module';
import { VotesModule } from '../votes/votes.module';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([NodePropertyKey]),
    NodePropertyValuesModule,
    VotesModule,
    PostsModule,
  ],
  providers: [NodePropertyKeysResolver, NodePropertyKeysService],
  exports: [NodePropertyKeysService],
})
export class NodePropertyKeysModule {}
