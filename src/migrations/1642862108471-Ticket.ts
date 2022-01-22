import { MigrationInterface, QueryRunner } from "typeorm";

export class Ticket1642862108471 implements MigrationInterface {
    name = "Ticket1642862108471"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("CREATE TABLE \"tickets\" (\"id\" SERIAL NOT NULL, \"isPaid\" boolean NOT NULL DEFAULT false, \"userId\" integer, \"typeId\" integer, CONSTRAINT \"REL_4bb45e096f521845765f657f5c\" UNIQUE (\"userId\"), CONSTRAINT \"PK_343bc942ae261cf7a1377f48fd0\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("ALTER TABLE \"tickets\" ADD CONSTRAINT \"FK_4bb45e096f521845765f657f5c8\" FOREIGN KEY (\"userId\") REFERENCES \"users\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"tickets\" ADD CONSTRAINT \"FK_2e86eac7faf971f2dca1f87ace9\" FOREIGN KEY (\"typeId\") REFERENCES \"ticketTypes\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"tickets\" DROP CONSTRAINT \"FK_2e86eac7faf971f2dca1f87ace9\"");
      await queryRunner.query("ALTER TABLE \"tickets\" DROP CONSTRAINT \"FK_4bb45e096f521845765f657f5c8\"");
      await queryRunner.query("DROP TABLE \"tickets\"");
    }
}
