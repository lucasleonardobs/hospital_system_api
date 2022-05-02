import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import Patient from '../infra/typeorm/entities/Patient';
import IPatientsRepository from '../repositories/IPatientsRepository';

interface IRequest {
    name: string;
    date_of_birth: Date;
    phone_number: string;
    cpf: string;
    cep: string;
    address: string;
    gender: 'male' | 'female';
}

@injectable()
class CreatePatientService {
    constructor(
        @inject('PatientsRepository')
        private patientsRepository: IPatientsRepository,
    ) {}

    public async execute({ name, date_of_birth, phone_number, cpf, cep, address, gender }: IRequest): Promise<Patient> {
        const checkPatientExists = await this.patientsRepository.findByCpf(cpf);

        if (checkPatientExists) {
            throw new AppError('Person already created.');
        };
        
        const patient = await this.patientsRepository.create({
            cpf,
            name,
            date_of_birth,
            phone_number,
            cep,
            address,
            gender
        });

        return patient;
    }
}

export default CreatePatientService;
