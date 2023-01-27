import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NodePropertyValuesService } from './node_property_values.service';
import { NodePropertyValuesResolver } from './node_property_values.resolver';
import { NodePropertyValue } from './node_property_value.entity';
import { VotesModule } from '../votes/votes.module';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([NodePropertyValue]),
    VotesModule,
    PostsModule,
  ],
  providers: [NodePropertyValuesResolver, NodePropertyValuesService],
  exports: [NodePropertyValuesService],
})
export class NodePropertyValuesModule {}
