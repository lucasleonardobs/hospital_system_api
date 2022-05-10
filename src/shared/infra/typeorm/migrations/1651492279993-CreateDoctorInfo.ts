import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateDoctorInfo1651492279993 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'doctor_infos',
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
                        name: 'doctor_name',
                        type: 'varchar',
                    },
                    {
                        name: 'avg_treated_mon',
                        type: 'numeric',
                    },
                    {                    
                        name: 'avg_treated_tue',
                        type: 'numeric',
                    },
                    {                    
                        name: 'avg_treated_wed',
                        type: 'numeric',
                    },
                    {                    
                        name: 'avg_treated_thu',
                        type: 'numeric',
                    },
                    {                    
                        name: 'avg_treated_fri',
                        type: 'numeric',
                    },
                    {                    
                        name: 'avg_treated_sat',
                        type: 'numeric',
                    },
                    {                    
                        name: 'avg_treated_sun',
                        type: 'numeric',
                    },
                    {
                        name: 'avg_consultation_time_mon',
                        type: 'timestamp',
                    },
                    {                    
                        name: 'avg_consultation_time_tue',
                        type: 'timestamp',
                    },
                    {                    
                        name: 'avg_consultation_time_wed',
                        type: 'timestamp',
                    },
                    {                    
                        name: 'avg_consultation_time_thu',
                        type: 'timestamp',
                    },
                    {                    
                        name: 'avg_consultation_time_fri',
                        type: 'timestamp',
                    },
                    {                    
                        name: 'avg_consultation_time_sat',
                        type: 'timestamp',
                    },
                    {                    
                        name: 'avg_consultation_time_sun',
                        type: 'timestamp',
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('doctor_infos');
    }

}
