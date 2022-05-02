/* eslint-disable camelcase */
import { getRepository, Repository } from 'typeorm';

import IAddPatientInListDTO from '../../../dtos/IAddPatientInListDTO';
import IAttendPatientDTO from '../../../dtos/IAttendPatientDTO';

import IWaitingListRepository from '../../../repositories/IWaitingListRepository';

import WaitingList from '../entities/WaitingList';

import AppError from '../../../../../shared/errors/AppError';

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

    public async attendPatient({
        cpf
    }: IAttendPatientDTO): Promise<WaitingList> {
        const patientInList = await this.ormRepository.findOne({
            where: { cpf },
        });

        if (!patientInList) {
            throw new AppError("Patient not found in WaitingList", 404);
        };

        const updatedPatient = {
            ...patientInList,
            attended: true,
        };

        await this.ormRepository.save(updatedPatient);

        return updatedPatient;
    }

}

export default WaitingListRepository;
