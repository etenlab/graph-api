import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Votable } from './votable.entity';
import { VotablesService } from './votables.service';
import { VotablesResolver } from './votables.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Votable])],
  providers: [VotablesResolver, VotablesService],
})
export class VotablesModule {}
