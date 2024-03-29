import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RelationshipsService } from './relationships.service';
import { RelationshipsResolver } from './relationships.resolver';
import { Relationship } from './relationship.entity';
import { RelationshipPropertyKeysModule } from '../relationship_property_keys/relationship_property_keys.module';
import { NodesModule } from '../nodes/nodes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Relationship]),
    RelationshipPropertyKeysModule,
    forwardRef(() => NodesModule),
  ],
  providers: [RelationshipsResolver, RelationshipsService],
  exports: [RelationshipsService],
})
export class RelationshipsModule {}
