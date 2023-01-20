import { Resolver, Query } from '@nestjs/graphql';
import { VotablesService } from './votables.service';
import { Votable } from './votable.entity';

@Resolver(() => Votable)
export class VotablesResolver {
  constructor(private readonly votablesService: VotablesService) {}

  @Query(() => [Votable], { name: 'votables' })
  findAll() {
    return this.votablesService.findAll();
  }
}
