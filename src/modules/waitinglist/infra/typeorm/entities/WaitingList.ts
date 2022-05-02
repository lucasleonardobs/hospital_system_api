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

    @OneToOne(type => Patient, { primary: true })
    @JoinColumn({ name: "patient_cpf" })
    patient: Patient;

    @Column({
        default: false,
    })
    attended: boolean;

    @Column({
        type: "enum",
        enum: [-1, 0, 1, 2],
        default: -1,
    })
    priority: -1 | 0 | 1 | 2 ;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default WaitingList;
