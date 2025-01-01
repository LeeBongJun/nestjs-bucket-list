import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1735732277869 implements MigrationInterface {
    name = ' $npmConfigName1735732277869'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "name" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "name" SET DEFAULT ''`);
    }

}
