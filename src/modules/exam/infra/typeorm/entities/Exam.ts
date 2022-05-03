import Patient from '../../../../patient/infra/typeorm/entities/Patient';

import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm';

@Entity('exams')
class Exam {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    patient_cpf: string;

    @OneToOne(type => Patient, { primary: true })
    @JoinColumn({ name: "patient_cpf" })
    patient: Patient;

    @Column()
    exam: string;

    @Column()
    doctor_name: string;

    @Column()
    scheduled_at: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Exam;
