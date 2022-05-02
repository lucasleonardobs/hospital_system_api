import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import WaitingList from '../infra/typeorm/entities/WaitingList';
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

    public async execute({ cpf }: IRequest): Promise<WaitingList> {
        const patientInList = await this.waitingListRepository.findByCpf(cpf);

        if (!patientInList) {
            throw new AppError('Patient not found in waiting list', 404);
        }

        return patientInList;
        
    };
}

export default RemovePatientService;
