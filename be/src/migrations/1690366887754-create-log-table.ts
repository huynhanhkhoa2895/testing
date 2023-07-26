import {MigrationInterface, QueryRunner, Table} from "typeorm"

export class CreateLogTable1690366887754 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "logs",
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: "content",
                    type: "varchar",
                },
                {
                    name: 'created_at',
                    type: 'datetime',
                    default: 'now()',
                },
                {
                    name: 'updated_at',
                    type: 'datetime',
                    default: 'now()',
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("logs");
    }

}
