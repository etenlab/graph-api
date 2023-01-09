import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RelationshipsService } from './relationships.service';
import { RelationshipsResolver } from './relationships.resolver';
import { Relationship } from './relationship.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Relationship])],
  providers: [RelationshipsResolver, RelationshipsService],
})
export class RelationshipsModule {}
