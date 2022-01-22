import { MigrationInterface, QueryRunner } from "typeorm";

export class TypeTicket1642857540769 implements MigrationInterface {
    name = "TypeTicket1642857540769"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("CREATE TABLE \"ticketTypes\" (\"id\" SERIAL NOT NULL, \"type\" character varying NOT NULL, \"price\" numeric(10,2) NOT NULL, \"hotelPrice\" numeric(10,2) NOT NULL, CONSTRAINT \"PK_f19014dc7cee8888c2e59c06d4b\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("ALTER TABLE \"addresses\" DROP CONSTRAINT \"FK_1ce5592b8fd5529a35fb9fe1460\"");
      await queryRunner.query("ALTER TABLE \"addresses\" ADD CONSTRAINT \"UQ_1ce5592b8fd5529a35fb9fe1460\" UNIQUE (\"enrollmentId\")");
      await queryRunner.query("ALTER TABLE \"addresses\" ADD CONSTRAINT \"FK_1ce5592b8fd5529a35fb9fe1460\" FOREIGN KEY (\"enrollmentId\") REFERENCES \"enrollments\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"addresses\" DROP CONSTRAINT \"FK_1ce5592b8fd5529a35fb9fe1460\"");
      await queryRunner.query("ALTER TABLE \"addresses\" DROP CONSTRAINT \"UQ_1ce5592b8fd5529a35fb9fe1460\"");
      await queryRunner.query("ALTER TABLE \"addresses\" ADD CONSTRAINT \"FK_1ce5592b8fd5529a35fb9fe1460\" FOREIGN KEY (\"enrollmentId\") REFERENCES \"enrollments\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("DROP TABLE \"ticketTypes\"");
    }
}
