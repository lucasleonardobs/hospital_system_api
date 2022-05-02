/* eslint-disable camelcase */
import { getRepository, Repository } from 'typeorm';

import ICreatePatientDTO from '../../../dtos/ICreatePatientDTO';
import IUpdatePatientDTO from '../../../dtos/IUpdatePatientDTO';
import IDeletePatientDTO from '../../../dtos/IDeletePatientDTO';
import IPatientsRepository from '../../../repositories/IPatientsRepository';


import AppError from '../../../../../shared/errors/AppError';

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
        const patient = this.ormRepository.create({
            name,
            date_of_birth,
            cpf,
            cep,
            address,
        });

        await this.ormRepository.save(patient);

        return patient;
    }

    public async delete({ cpf }: IDeletePatientDTO): Promise<void> {
        await this.ormRepository.delete(cpf);
    }

    public async update({
        name,
        date_of_birth,
        cpf,
        cep,
        address,
    }: IUpdatePatientDTO): Promise<Patient> {
        const patient = await this.ormRepository.findOne({
            cpf
        });

        if (!patient) {
            throw new AppError("Patient not found", 404);
        };

        const updatedPatient = {
            ...patient,
            name,
            date_of_birth,
            cpf,
            cep,
            address,
        };

        await this.ormRepository.save(updatedPatient);

        return updatedPatient;
    }

    public async findByCpf(cpf: string): Promise<Patient | undefined> {
        const user = await this.ormRepository.findOne({
            where: { cpf },
        });

        return user;
    }

    public async findAll(): Promise<Patient[] | undefined> {
        const query = this.ormRepository.createQueryBuilder('patients').orderBy('patients.id', 'ASC');
    
        const patients = await query.getMany();
    
        return patients
    }
}

export default PatientsRepository;
