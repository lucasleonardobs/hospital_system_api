import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import WaitingList from '../infra/typeorm/entities/WaitingList';
import IWaitingListRepository from '../repositories/IWaitingListRepository';

interface IRequest {
    cpf: string;
}

@injectable()
class AddPatientService {
    constructor(
        @inject('WaitingListRepository')
        private waitingListRepository: IWaitingListRepository,
    ) {}

    public async execute({ cpf }: IRequest): Promise<WaitingList> {
        const checkPatientExistsInList = await this.waitingListRepository.findByCpf(cpf);

        if (!checkPatientExistsInList) {
            throw new AppError('Patient isn\'t in Waiting List.');
        };

        const patientInWaitingList = await this.waitingListRepository.attendPatient({
            cpf
        });

        return patientInWaitingList;
    }
}

export default AddPatientService;
