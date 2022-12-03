import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

// await client.connect()
// const res = await client.query('SELECT $1::text as message', ['Hello world!'])
// console.log(res.rows[0].message) // Hello world!
// await client.end()

@Injectable()
export class PostgresService {
  readonly pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_URL,
    database: process.env.DB,
    password: process.env.DB_PASSWORD,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    port: +process.env.DB_PORT!,
  });
}

/*
export DB_USER=postgres
export DB_URL=localhost
export DB=usq
export DB_PASSWORD=asdfasdf
export Db_PORT=5432
*/