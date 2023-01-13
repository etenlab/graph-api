import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RelationshipPropertyKeysService } from './relationship_property_keys.service';
import { RelationshipPropertyKeysResolver } from './relationship_property_keys.resolver';
import { RelationshipPropertyKey } from './relationship_property_key.entity';
import { RelationshipPropertyValuesModule } from '../relationship_property_values/relationship_property_values.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RelationshipPropertyKey]),
    RelationshipPropertyValuesModule,
  ],
  providers: [
    RelationshipPropertyKeysResolver,
    RelationshipPropertyKeysService,
  ],
  exports: [RelationshipPropertyKeysService],
})
export class RelationshipPropertyKeysModule {}
