import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1674777664979 implements MigrationInterface {
  name = 'Migration1674777664979';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "admin"."discussions" ("id" BIGSERIAL NOT NULL, "table_name" character varying(64) NOT NULL, "row" bigint NOT NULL, CONSTRAINT "PK_4b3d110d8e5d9077ddc0a0d1b4c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "admin"."posts" ("id" BIGSERIAL NOT NULL, "discussion_id" bigint NOT NULL, "plain_text" character varying NOT NULL, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "admin"."posts" ADD CONSTRAINT "posts_discussion_id_fkey" FOREIGN KEY ("discussion_id") REFERENCES "admin"."discussions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "admin"."posts" DROP CONSTRAINT "posts_discussion_id_fkey"`,
    );
    await queryRunner.query(`DROP TABLE "admin"."posts"`);
    await queryRunner.query(`DROP TABLE "admin"."discussions"`);
  }
}
