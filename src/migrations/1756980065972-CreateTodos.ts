import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTodos1756980065972 implements MigrationInterface {
    name = 'CreateTodos1756980065972'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "todos" ("id" SERIAL NOT NULL, "content" character varying(255), "isDone" boolean NOT NULL DEFAULT false, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ca8cafd59ca6faaf67995344225" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "todos"`);
    }

}
