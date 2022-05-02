import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import IWaitingListRepository from '../repositories/IWaitingListRepository';

interface IRequest {
    cpf: string;
}

@injectable()
class RemovePatientService {
    constructor(
        @inject('WaitingListRepository')
        private waitingListRepository: IWaitingListRepository,
    ) {}

    public async execute({ cpf }: IRequest): Promise<void> {
        const checkPatientIsInList = await this.waitingListRepository.findByCpf(cpf);

        if (!checkPatientIsInList) {
            throw new AppError('Patient isn\'t in Waiting List.');
        };

        await this.waitingListRepository.removePatient({ cpf });   
    }
}

export default RemovePatientService;
