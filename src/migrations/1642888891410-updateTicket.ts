import { MigrationInterface, QueryRunner } from "typeorm";

export class updateTicket1642888891410 implements MigrationInterface {
    name = "updateTicket1642888891410"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("CREATE TABLE \"enrollments\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, \"cpf\" character varying NOT NULL, \"birthday\" character varying NOT NULL, \"phone\" character varying NOT NULL, \"userId\" integer NOT NULL, CONSTRAINT \"UQ_409b735ec0a7fcc6c1a0dab2da2\" UNIQUE (\"cpf\"), CONSTRAINT \"PK_7c0f752f9fb68bf6ed7367ab00f\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"addresses\" (\"id\" SERIAL NOT NULL, \"cep\" character varying NOT NULL, \"street\" character varying NOT NULL, \"city\" character varying NOT NULL, \"number\" character varying NOT NULL, \"state\" character varying NOT NULL, \"neighborhood\" character varying NOT NULL, \"addressDetail\" character varying, \"enrollmentId\" integer NOT NULL, CONSTRAINT \"REL_1ce5592b8fd5529a35fb9fe146\" UNIQUE (\"enrollmentId\"), CONSTRAINT \"PK_745d8f43d3af10ab8247465e450\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"roomTypes\" (\"id\" SERIAL NOT NULL, \"type\" character varying NOT NULL, \"bedsQuantity\" integer NOT NULL, CONSTRAINT \"PK_76acf48dc34f1c3525d71606cbc\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"ticketTypes\" (\"id\" SERIAL NOT NULL, \"type\" character varying NOT NULL, \"price\" numeric(10,2) NOT NULL, \"hotelPrice\" numeric(10,2) NOT NULL, CONSTRAINT \"PK_f19014dc7cee8888c2e59c06d4b\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"users\" (\"id\" SERIAL NOT NULL, \"email\" character varying NOT NULL, \"password\" character varying NOT NULL, \"createdAt\" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT \"PK_a3ffb1c0c8416b9fc6f907b7433\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"tickets\" (\"id\" SERIAL NOT NULL, \"isPaid\" boolean NOT NULL DEFAULT false, \"roomId\" integer, \"userId\" integer, \"typeId\" integer, CONSTRAINT \"REL_4bb45e096f521845765f657f5c\" UNIQUE (\"userId\"), CONSTRAINT \"PK_343bc942ae261cf7a1377f48fd0\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"rooms\" (\"id\" SERIAL NOT NULL, \"number\" character varying NOT NULL, \"hotelId\" integer NOT NULL, \"roomTypeId\" integer NOT NULL, CONSTRAINT \"PK_0368a2d7c215f2d0458a54933f2\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"hotels\" (\"id\" SERIAL NOT NULL, \"image\" character varying NOT NULL, \"name\" character varying NOT NULL, \"totalOfBeds\" integer NOT NULL, CONSTRAINT \"PK_2bb06797684115a1ba7c705fc7b\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"sessions\" (\"id\" SERIAL NOT NULL, \"userId\" integer NOT NULL, \"token\" character varying NOT NULL, CONSTRAINT \"PK_3238ef96f18b355b671619111bc\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"settings\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, \"value\" character varying NOT NULL, CONSTRAINT \"UQ_ca7857276d2a30f4dcfa0e42cd4\" UNIQUE (\"name\"), CONSTRAINT \"PK_0669fe20e252eb692bf4d344975\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("ALTER TABLE \"addresses\" ADD CONSTRAINT \"FK_1ce5592b8fd5529a35fb9fe1460\" FOREIGN KEY (\"enrollmentId\") REFERENCES \"enrollments\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"tickets\" ADD CONSTRAINT \"FK_4bb45e096f521845765f657f5c8\" FOREIGN KEY (\"userId\") REFERENCES \"users\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"tickets\" ADD CONSTRAINT \"FK_2e86eac7faf971f2dca1f87ace9\" FOREIGN KEY (\"typeId\") REFERENCES \"ticketTypes\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"tickets\" ADD CONSTRAINT \"FK_4ee357cce7fc67e1ffe07bb65f9\" FOREIGN KEY (\"roomId\") REFERENCES \"rooms\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"rooms\" ADD CONSTRAINT \"FK_e9d4d68c8c47b7fe47b8e233f60\" FOREIGN KEY (\"hotelId\") REFERENCES \"hotels\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"rooms\" ADD CONSTRAINT \"FK_76b20e23154532d6fc4a0f0ea27\" FOREIGN KEY (\"roomTypeId\") REFERENCES \"roomTypes\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"rooms\" DROP CONSTRAINT \"FK_76b20e23154532d6fc4a0f0ea27\"");
      await queryRunner.query("ALTER TABLE \"rooms\" DROP CONSTRAINT \"FK_e9d4d68c8c47b7fe47b8e233f60\"");
      await queryRunner.query("ALTER TABLE \"tickets\" DROP CONSTRAINT \"FK_4ee357cce7fc67e1ffe07bb65f9\"");
      await queryRunner.query("ALTER TABLE \"tickets\" DROP CONSTRAINT \"FK_2e86eac7faf971f2dca1f87ace9\"");
      await queryRunner.query("ALTER TABLE \"tickets\" DROP CONSTRAINT \"FK_4bb45e096f521845765f657f5c8\"");
      await queryRunner.query("ALTER TABLE \"addresses\" DROP CONSTRAINT \"FK_1ce5592b8fd5529a35fb9fe1460\"");
      await queryRunner.query("DROP TABLE \"settings\"");
      await queryRunner.query("DROP TABLE \"sessions\"");
      await queryRunner.query("DROP TABLE \"hotels\"");
      await queryRunner.query("DROP TABLE \"rooms\"");
      await queryRunner.query("DROP TABLE \"tickets\"");
      await queryRunner.query("DROP TABLE \"users\"");
      await queryRunner.query("DROP TABLE \"ticketTypes\"");
      await queryRunner.query("DROP TABLE \"roomTypes\"");
      await queryRunner.query("DROP TABLE \"addresses\"");
      await queryRunner.query("DROP TABLE \"enrollments\"");
    }
}
