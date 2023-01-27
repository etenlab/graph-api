import { Resolver, Query, Args, Int } from '@nestjs/graphql';

import { DiscussionsService } from './discussions.service';
import { Discussion } from './discussion.entity';

@Resolver(() => Discussion)
export class DiscussionsResolver {
  constructor(private readonly discussionsService: DiscussionsService) {}

  @Query(() => [Discussion], { name: 'discussions' })
  findAll() {
    return this.discussionsService.findAll();
  }

  @Query(() => Discussion, { name: 'discussion' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.discussionsService.findOne(id);
  }
}
