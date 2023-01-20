import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { VotesService } from './votes.service';
import { Vote } from './vote.entity';

@Resolver(() => Vote)
export class VotesResolver {
  constructor(private readonly votesService: VotesService) {}

  @Query(() => [Vote], { name: 'votes' })
  findAll() {
    return this.votesService.findAll();
  }

  @Query(() => Vote, { name: 'vote' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.votesService.findOne(id);
  }
}
