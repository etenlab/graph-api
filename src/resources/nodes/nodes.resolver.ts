import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { NodesService } from './nodes.service';
import { Node } from './node.entity';

@Resolver(() => Node)
export class NodesResolver {
  constructor(private readonly nodesService: NodesService) {}

  @Query(() => [Node], { name: 'nodes' })
  findAll() {
    return this.nodesService.findAll();
  }

  @Query(() => Node, { name: 'node' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.nodesService.findOne(id);
  }
}
