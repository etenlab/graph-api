import { Resolver, Query } from '@nestjs/graphql';
import { NodeTypesService } from './node_types.service';
import { NodeType } from './node_type.entity';

@Resolver(() => NodeType)
export class NodeTypesResolver {
  constructor(private readonly nodeTypesService: NodeTypesService) {}

  @Query(() => [NodeType], { name: 'nodeTypes' })
  findAll() {
    return this.nodeTypesService.findAll();
  }
}
