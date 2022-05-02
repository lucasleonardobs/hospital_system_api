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

@Entity('waitinglists')
class WaitingList {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    patient_cpf: string;

    @OneToOne(() => Patient)
    @JoinColumn({ name: "patient_cpf" })
    patient: Patient;

    @Column()
    attended: boolean;

    @Column()
    priority: 0 | 1 | 2;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default WaitingList;
