/* eslint-disable camelcase */
import { getRepository, Repository } from 'typeorm';

import IAddPatientInListDTO from '../../../dtos/IAddPatientInListDTO';

import IWaitingListRepository from '../../../repositories/IWaitingListRepository';

import WaitingList from '../entities/WaitingList';

class WaitingListRepository implements IWaitingListRepository {
    private ormRepository: Repository<WaitingList>;

    constructor() {
        this.ormRepository = getRepository(WaitingList);
    }

    public async addPatient({
        cpf,
        priority
    }: IAddPatientInListDTO): Promise<WaitingList> {
        const patientInList = this.ormRepository.create({
            patient_cpf: cpf,
            priority,
        });

        await this.ormRepository.save(patientInList);

        return patientInList;
    };

    public async findByCpf(cpf: string): Promise<WaitingList | undefined> {
        const waitingList = await this.ormRepository.findOne({
            where: { cpf },
        });

        return waitingList;
    }

}

export default WaitingListRepository;
