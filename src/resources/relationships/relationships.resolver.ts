import {
  Resolver,
  Query,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

import { RelationshipsService } from './relationships.service';
import { Relationship } from './relationship.entity';
import { RelationshipPropertyKey } from '../relationship_property_keys/relationship_property_key.entity';
import { RelationshipPropertyKeysService } from '../relationship_property_keys/relationship_property_keys.service';
import { Node } from '../nodes/node.entity';
import { NodesService } from '../nodes/nodes.service';

@Resolver(() => Relationship)
export class RelationshipsResolver {
  constructor(
    private readonly relationshipsService: RelationshipsService,
    private readonly relationshipPropertyKeysService: RelationshipPropertyKeysService,
    private readonly nodesService: NodesService,
  ) {}

  @Query(() => [Relationship], { name: 'relationships' })
  findAll() {
    return this.relationshipsService.findAll();
  }

  @Query(() => Relationship, { name: 'relationship' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.relationshipsService.findOne(id);
  }

  @ResolveField('propertyKeys', () => [RelationshipPropertyKey])
  findPropertyKeys(@Parent() { relationship_id }: Relationship) {
    return this.relationshipPropertyKeysService.findAll({
      where: { relationship_id },
    });
  }

  @ResolveField('fromNode', () => Node)
  findFromNode(@Parent() { from_node_id }: Relationship) {
    return this.nodesService.findOne(from_node_id);
  }

  @ResolveField('toNode', () => Node)
  findToNode(@Parent() { to_node_id }: Relationship) {
    return this.nodesService.findOne(to_node_id);
  }
}
