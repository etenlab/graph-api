import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RelationshipPropertyValuesService } from './relationship_property_values.service';
import { RelationshipPropertyValuesResolver } from './relationship_property_values.resolver';
import { RelationshipPropertyValue } from './relationship_property_value.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RelationshipPropertyValue])],
  providers: [
    RelationshipPropertyValuesResolver,
    RelationshipPropertyValuesService,
  ],
  exports: [RelationshipPropertyValuesService],
})
export class RelationshipPropertyValuesModule {}
