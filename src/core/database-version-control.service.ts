import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { PostgresService } from './postgres.service';

export const sqlFilePaths = [
  './src/core/sql/graph_create_or_read_word.sql',
  './src/core/sql/graph_create_word_sequence.sql',
  './src/core/sql/graph_create_or_read_word_sequence.sql',
  './src/core/sql/graph_build_textual_nodes.sql',
  './src/core/sql/graph_utils.sql',
  './src/core/sql/graph_add_relationship.sql',
  './src/core/sql/graph_add_node.sql',
  './src/core/sql/graph_create_verse.sql',
  './src/core/sql/graph_create_chapter.sql',
  './src/core/sql/graph_create_book.sql',
  './src/core/sql/graph_create_bible.sql',
];

@Injectable()
export class DatabaseVersionControlService {
  constructor(private pg: PostgresService) {
    console.log('upserting graph procedures');
    this.upsert_procedures();
  }

  async upsert_procedures() {
    for (const path of sqlFilePaths) {
      await this.runSqlFile(path);
    }
  }

  async runSqlFile(path: string) {
    console.log('loading SQL:', path);
    const data = readFileSync(path, 'utf8');
    await this.pg.pool.query(data, []);
  }
}
