import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateExam1651491517476 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'exams',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isUnique: true,
                        generationStrategy: 'uuid',
                        default: `uuid_generate_v4()`,
                    },
                    {
                        name: 'patient_cpf',
                        type: 'varchar',
                        isPrimary: true,
                        isUnique: true,
                    },
                    {
                        name: 'exam',
                        type: 'varchar',
                    },
                    {
                        name: 'scheduled_at',
                        type: 'timestamp',
                    },
                    {
                        name: 'doctor_name',
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
            })
        );

        await queryRunner.createForeignKey("exams", new TableForeignKey({
            name: "PatientExam",
            columnNames: ["patient_cpf"],
            referencedColumnNames: ["cpf"],
            referencedTableName: "patients",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('exams', 'PatientExam')
        await queryRunner.dropTable('exams');
    }

}
