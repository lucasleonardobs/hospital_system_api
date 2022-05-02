import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import IPatientRepository from '../repositories/IPatientsRepository';
import Patient from '../infra/typeorm/entities/Patient';

interface IRequest {
    cpf: string;
}

@injectable()
class ShowOnePatientService {
    constructor(
        @inject('PatientRepository')
        private patientsRepository: IPatientRepository,
    ) {}

    public async execute({ cpf }: IRequest): Promise<Patient> {
        const patient = await this.patientsRepository.findByCpf(cpf);

        if (!patient) {
            throw new AppError('Patient not found', 404);
        }

        return patient;
    }
}

export default ShowOnePatientService;
