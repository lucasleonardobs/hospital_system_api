import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import IPatientRepository from '../repositories/IPatientsRepository';

interface Request {
    cpf: string;
}

@injectable()
class DeletePatientService {
    constructor(
        @inject('PatientsRepository')
        private patientsRepository: IPatientRepository,
    ) {}

    public async execute({ cpf }: Request): Promise<void> {
        const checkPatientsExist = await this.patientsRepository.findByCpf(cpf);

        if (!checkPatientsExist) {
            throw new AppError('Patient not found.', 404);
        }

        await this.patientsRepository.delete({ cpf });
    }
}

export default DeletePatientService;
