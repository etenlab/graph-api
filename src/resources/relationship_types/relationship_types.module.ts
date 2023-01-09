import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RelationshipTypesService } from './relationship_types.service';
import { RelationshipTypesResolver } from './relationship_types.resolver';
import { RelationshipType } from './relationship_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RelationshipType])],
  providers: [RelationshipTypesResolver, RelationshipTypesService],
})
export class RelationshipTypesModule {}
