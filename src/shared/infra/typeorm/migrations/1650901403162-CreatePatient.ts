import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePatient1650901403162 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'patients',
                columns: [
                    {
                        name: 'cpf',
                        type: 'varchar',
                        isPrimary: true,
                        isUnique: true,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'cep',
                        type: 'varchar',
                    },              
                    {
                        name: 'address',
                        type: 'varchar',
                    },
                    {
                        name: 'phone_number',
                        type: 'varchar',
                    },
                    {
                        name: 'date_of_birth',
                        type: 'timestamp',
                    },
                    {
                        name: 'gender',
                        type: 'varchar',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }
        ))
    };

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('patients');
    };

}
