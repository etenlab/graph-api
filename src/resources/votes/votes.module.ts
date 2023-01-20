import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Vote } from './vote.entity';
import { VotesService } from './votes.service';
import { VotesResolver } from './votes.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Vote])],
  providers: [VotesResolver, VotesService],
  exports: [VotesService],
})
export class VotesModule {}
