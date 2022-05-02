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
}

@injectable()
class UpdatePatientService {
    constructor(
        @inject('PatientsRepository')
        private patientsRepository: IPatientsRepository,
    ) {}

    public async execute({ name, date_of_birth, phone_number, cpf, cep, address }: IRequest): Promise<Patient> {
        const checkPatientExists = await this.patientsRepository.findByCpf(cpf);

        if (!checkPatientExists) {
            throw new AppError('Patient not found', 404);
        }
        
        const patient = await this.patientsRepository.update({
            name,
            date_of_birth,
            phone_number,
            cpf,
            cep,
            address,
        });

        return patient;
    }
}

export default UpdatePatientService;
