import {
    Entity,
    Column,
    PrimaryColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('patients')
class Patient {
    @PrimaryColumn()
    cpf: string;

    @Column()
    name: string;

    @Column()
    date_of_birth: Date;
    
    @Column()
    phone_number: string;

    @Column()
    cep: string;

    @Column()
    address: string;

    @Column()
    gender: 'male' | 'female';

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Patient;
