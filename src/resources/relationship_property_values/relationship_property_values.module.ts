import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RelationshipPropertyValuesService } from './relationship_property_values.service';
import { RelationshipPropertyValuesResolver } from './relationship_property_values.resolver';
import { RelationshipPropertyValue } from './relationship_property_value.entity';
import { VotesModule } from '../votes/votes.module';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RelationshipPropertyValue]),
    VotesModule,
    PostsModule,
  ],
  providers: [
    RelationshipPropertyValuesResolver,
    RelationshipPropertyValuesService,
  ],
  exports: [RelationshipPropertyValuesService],
})
export class RelationshipPropertyValuesModule {}
