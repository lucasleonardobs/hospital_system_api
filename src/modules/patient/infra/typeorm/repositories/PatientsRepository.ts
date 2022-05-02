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
        phone_number,
        gender,
    }: ICreatePatientDTO): Promise<Patient> {
        const patient = this.ormRepository.create({
            name,
            date_of_birth,
            cpf,
            phone_number,
            cep,
            address,
            gender,
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
        gender,
        phone_number,
    }: IUpdatePatientDTO): Promise<Patient> {
        const patient = await this.ormRepository.findOne({
            cpf
        });

        if (!patient) {
            throw new AppError("Patient not found", 404);
        };

        const updatedPatient = {
            ...patient,
            cpf,
            cep,
            name,
            date_of_birth,
            address,
            phone_number,
            gender,
        };

        await this.ormRepository.save(updatedPatient);

        return updatedPatient;
    }

    public async findByCpf(cpf: string): Promise<Patient | undefined> {
        const patient = await this.ormRepository.findOne({
            where: { cpf },
        });

        return patient;
    }

    public async findAll(): Promise<Patient[] | undefined> {
        const patients = this.ormRepository.find()
    
        return patients
    }
}

export default PatientsRepository;
