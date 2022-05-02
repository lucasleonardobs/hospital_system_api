import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import WaitingList from '../infra/typeorm/entities/WaitingList';
import IWaitingListRepository from '../repositories/IWaitingListRepository';

interface IRequest {
    cpf: string;
    priority: 0 | 1 | 2
}

@injectable()
class AddPatientService {
    constructor(
        @inject('WaitingListRepository')
        private waitingListRepository: IWaitingListRepository,
    ) {}

    public async execute({ cpf, priority }: IRequest): Promise<WaitingList> {
        const checkPatientExistsInList = await this.waitingListRepository.findByCpf(cpf);

        if (checkPatientExistsInList) {
            throw new AppError('Person already by in Waiting List.');
        };

        const patientInWaitingList = await this.waitingListRepository.addPatient({
            cpf,
            priority,
        });

        return patientInWaitingList;
    }
}

export default AddPatientService;
