import { v4 } from 'uuid';

import IAddPatientInListDTO from '../../dtos/IAddPatientInListDTO';
import IAttendPatientDTO from '../../dtos/IAttendPatientDTO';
import IRemovePatientFromListDTO from '../../dtos/IRemovePatientFromListDTO';
import IFindAllDTO from '../../dtos/IFindAllDTO';

import IWaitingListRepository from '../IWaitingListRepository';

import WaitingList from '../../infra/typeorm/entities/WaitingList';

import AppError from '../../../../shared/errors/AppError';

class WaitingListRepository implements IWaitingListRepository {
    private waitingList: WaitingList[] = [];

    public async addPatient({
        cpf,
        priority
    }: IAddPatientInListDTO): Promise<WaitingList> {
        const patientInWaitingList = new WaitingList();

        Object.assign(patientInWaitingList, {
            id: v4(),
            priority,
            patient_cpf: cpf,
            attended: false
        });

        this.waitingList.push(patientInWaitingList);

        return patientInWaitingList;
    };

    public async findByCpf(cpf: string): Promise<WaitingList | undefined> {
        const findPatientInWaitingList = this.waitingList.find(patient => patient.patient_cpf == cpf);

        return findPatientInWaitingList;
    };

    public async attendPatient({
        cpf
    }: IAttendPatientDTO): Promise<WaitingList> {
        const findPatientInWaitingList = this.waitingList.find(patient => patient.patient_cpf == cpf);

        if (!findPatientInWaitingList) {
            throw new AppError('Patient not found in Waiting List', 404);
        }

        findPatientInWaitingList.attended = true;
        findPatientInWaitingList.priority = -1;
    
        return findPatientInWaitingList;
    };

    public async removePatient({
        cpf
    }: IRemovePatientFromListDTO): Promise<void> {
        const filtered = this.waitingList.filter(patient => patient.patient_cpf !== cpf);
        this.waitingList = filtered;
    };

    public async findAll({ filter }: IFindAllDTO): Promise<WaitingList[]> {
        if (filter == -1) {
            return this.waitingList;
        };

        return this.waitingList.filter(patientInWaitingList => patientInWaitingList.priority == filter);
    }
}

export default WaitingListRepository;
