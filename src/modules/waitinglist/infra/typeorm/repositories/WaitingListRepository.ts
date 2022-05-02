/* eslint-disable camelcase */
import { getRepository, Repository } from 'typeorm';

import IAddPatientInListDTO from '../../../dtos/IAddPatientInListDTO';
import IAttendPatientDTO from '../../../dtos/IAttendPatientDTO';
import IRemovePatientFromListDTO from '../../../dtos/IRemovePatientFromListDTO';
import IFindAllDTO from '../../../dtos/IFindAllDTO';

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
    };

    public async attendPatient({
        cpf
    }: IAttendPatientDTO): Promise<WaitingList> {
        const patientInList = await this.ormRepository.findOne({
            where: { cpf },
        });

        if (!patientInList) {
            throw new AppError("Patient not found in WaitingList", 404);
        };

        patientInList.attended = true;
        patientInList.priority = null;

        await this.ormRepository.save(patientInList);

        return patientInList;
    };

    public async removePatient({
        cpf
    }: IRemovePatientFromListDTO): Promise<void> {
        await this.ormRepository.delete(cpf);
    };

    public async findAll({ filter }: IFindAllDTO): Promise<WaitingList[]> {
        const query = this.ormRepository.createQueryBuilder('waitinglists')

        if (filter < 0) {
            query.orderBy('waitinglists.attended', 'DESC');
            query.orderBy('waitinglists.priority', 'DESC');
            query.orderBy('waitinglists.created_at', 'DESC');
        } else {
            query.where({priority: filter})
            query.orderBy('waitinglists.attended', 'DESC');
            query.orderBy('waitinglists.created_at', 'DESC');
        }

        const patientsInList = await query.getMany();
    
        return patientsInList
    }
}

export default WaitingListRepository;
