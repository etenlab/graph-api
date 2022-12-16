import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { PostgresService } from './postgres.service';

@Injectable()
export class DatabaseVersionControlService {
  constructor(private pg: PostgresService) {
    console.log('upserting graph procedures');
    this.upsert_procedures();
  }

  async upsert_procedures() {
    await this.runSqlFile('./src/core/sql/graph_create_or_read_word.sql');
    await this.runSqlFile('./src/core/sql/graph_create_word_sequence.sql');
    await this.runSqlFile(
      './src/core/sql/graph_create_or_read_word_sequence.sql',
    );
    await this.runSqlFile('./src/core/sql/graph_build_textual_nodes.sql');
  }

  async runSqlFile(path: string) {
    console.log('loading SQL:', path);
    const data = readFileSync(path, 'utf8');
    const res = await this.pg.pool.query(data, []);
  }
}
