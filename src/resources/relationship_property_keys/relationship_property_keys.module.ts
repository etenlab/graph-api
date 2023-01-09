import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RelationshipPropertyKeysService } from './relationship_property_keys.service';
import { RelationshipPropertyKeysResolver } from './relationship_property_keys.resolver';
import { RelationshipPropertyKey } from './relationship_property_key.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RelationshipPropertyKey])],
  providers: [
    RelationshipPropertyKeysResolver,
    RelationshipPropertyKeysService,
  ],
})
export class RelationshipPropertyKeysModule {}
