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
        const query = this.ormRepository.createQueryBuilder('waitinglists');

        query.leftJoinAndSelect("waitinglists.patient", "patients");
        query.select([
            'waitinglists.id', 'waitinglists.patient_cpf', 'waitinglists.attended', 'waitinglists.priority', 'waitinglists.created_at',
            'patients.name', 'patients.date_of_birth', 'patients.phone_number', 'patients.cep', 'patients.address', 'patients.gender']
        );
        query.where({ patient_cpf: cpf });

        const patientsInList = await query.getOne();
    
        return patientsInList
    };

    public async attendPatient({
        cpf
    }: IAttendPatientDTO): Promise<WaitingList> {
        const patientInList = await this.ormRepository.findOne({
            where: { patient_cpf: cpf },
        });

        if (!patientInList) {
            throw new AppError("Patient not found in WaitingList", 404);
        };

        patientInList.attended = true;
        patientInList.priority = -1;

        await this.ormRepository.save(patientInList);

        return patientInList;
    };

    public async removePatient({
        cpf
    }: IRemovePatientFromListDTO): Promise<void> {
        await this.ormRepository.createQueryBuilder()
            .where("patient_cpf = :patient_cpf", { 
                patient_cpf: cpf
            }).delete().execute();
    };

    public async findAll({ filter }: IFindAllDTO): Promise<WaitingList[]> {
        const query = this.ormRepository.createQueryBuilder('waitinglists')

        if (filter >= 0) {
            query.where({priority: filter})
            query.addOrderBy('waitinglists.created_at', 'ASC');
        } else {
            query.addOrderBy('priority', 'DESC');
            query.addOrderBy('waitinglists.created_at', 'ASC');
        }

        query.leftJoinAndSelect("waitinglists.patient", "patients") 
        query.select([
            'waitinglists.id', 'waitinglists.patient_cpf', 'waitinglists.attended', 'waitinglists.priority', 'waitinglists.created_at',
            'patients.name', 'patients.date_of_birth', 'patients.phone_number', 'patients.cep', 'patients.address', 'patients.gender']
        );

        const patientsInList = await query.getMany();
    
        return patientsInList
    }
}

export default WaitingListRepository;
