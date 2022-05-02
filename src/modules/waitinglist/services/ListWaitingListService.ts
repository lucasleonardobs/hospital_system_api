
import { inject, injectable } from 'tsyringe';

import WaitingList from '../infra/typeorm/entities/WaitingList';
import IWaitingListRepository from '../repositories/IWaitingListRepository';

interface IRequest {
    filter: -1 | 0 | 1 | 2;
}

@injectable()
class ListPatientService {
    constructor(
        @inject('WaitingListRepository')
        private waitingListRepository: IWaitingListRepository,
    ) {}

    public async execute({ filter }: IRequest ): Promise<WaitingList[] | undefined> {
        const patients = await this.waitingListRepository.findAll({ filter });

        return patients;
    }
}

export default ListPatientService;
