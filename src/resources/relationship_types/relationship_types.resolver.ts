import { Resolver, Query } from '@nestjs/graphql';
import { RelationshipTypesService } from './relationship_types.service';
import { RelationshipType } from './relationship_type.entity';

@Resolver(() => RelationshipType)
export class RelationshipTypesResolver {
  constructor(
    private readonly relationshipTypesService: RelationshipTypesService,
  ) {}

  @Query(() => [RelationshipType], { name: 'relationshipTypes' })
  findAll() {
    return this.relationshipTypesService.findAll();
  }
}
