import WaitingList from '../infra/typeorm/entities/WaitingList';

import IAddPatientInListDTO from '../dtos/IAddPatientInListDTO';
import IAttendPatientDTO from '../../../dtos/IAttendPatientDTO';

interface IWaitingListRepository {
    addPatient(data: IAddPatientInListDTO): Promise<WaitingList>;
    removePatient(): void;
    attendPatient(data: IAttendPatientDTO): Promise<WaitingList>;
    findAll(): Promise<WaitingList[]>;
    findByCpf(cpf: string): Promise<WaitingList | undefined>
}

export default IWaitingListRepository;
