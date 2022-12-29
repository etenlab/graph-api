import { Client } from 'pg';
import { readFileSync } from 'fs';
import { PostgreSqlContainer } from 'testcontainers/dist/modules/postgresql/postgresql-container';

import { sqlFilePaths } from '../../src/core/database-version-control.service';

export async function runQuery(
  query: string | ((container: PostgreSqlContainer) => string),
) {
  const container = new PostgreSqlContainer();
  const queryText = typeof query === 'string' ? query : query(container);
  const startedContainer = await container.start();
  const client = new Client({
    host: startedContainer.getHost(),
    port: startedContainer.getPort(),
    database: startedContainer.getDatabase(),
    user: startedContainer.getUsername(),
    password: startedContainer.getPassword(),
  });

  await client.connect();

  const sql = [
    readFileSync('./src/core/sql/schema.sql', 'utf8'),
    ...sqlFilePaths.map((path) => readFileSync(path, 'utf8')),
  ].join('');

  await client.query(sql);

  const result = await client.query(queryText);

  await client.end();
  await startedContainer.stop();

  return result;
}
