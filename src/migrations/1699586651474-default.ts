import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1699586651474 implements MigrationInterface {
    name = 'Default1699586651474'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "patient" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" text NOT NULL, "telephone" text NOT NULL, "dateOfBirth" date NOT NULL, "gender" text NOT NULL, "wing" text, "room" integer, "CREATED_AT" datetime NOT NULL DEFAULT ('2023-11-10T03:24:13.543Z'), "UPDATED_AT" datetime NOT NULL DEFAULT ('2023-11-10T03:24:13.543Z'))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "patient"`);
    }

}
