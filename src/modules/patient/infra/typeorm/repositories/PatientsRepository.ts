/* eslint-disable camelcase */
import { getRepository, Repository } from 'typeorm';

import ICreatePatientDTO from '../../../dtos/ICreatePatientDTO';

import IDeletePatientDTO from '../../../dtos/IDeletePatientDTO';
import IPatientsRepository from '../../../repositories/IPatientsRepository';

import Patient from '../entities/Patient';

class PatientsRepository implements IPatientsRepository {
    private ormRepository: Repository<Patient>;

    constructor() {
        this.ormRepository = getRepository(Patient);
    }

    public async create({
        name,
        date_of_birth,
        cpf,
        cep,
        address,
    }: ICreatePatientDTO): Promise<Patient> {
        const user = this.ormRepository.create({
            name,
            date_of_birth,
            cpf,
            cep,
            address,
        });

        await this.ormRepository.save(user);

        return user;
    }

    public async delete({ cpf }: IDeletePatientDTO): Promise<void> {
        await this.ormRepository.delete(cpf);
    }

}

export default PatientsRepository;
