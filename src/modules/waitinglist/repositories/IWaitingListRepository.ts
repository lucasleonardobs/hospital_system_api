import WaitingList from '../infra/typeorm/entities/WaitingList';

import IAddPatientInListDTO from '../dtos/IAddPatientInListDTO';

interface IWaitingListRepository {
    addPatient(data: IAddPatientInListDTO): Promise<WaitingList>;
    removePatient(): void;
    attendPatient(): Promise<WaitingList>;
    findAll(): Promise<WaitingList[]>;
    findByCpf(cpf: string): Promise<WaitingList | undefined>
}

export default IWaitingListRepository;
