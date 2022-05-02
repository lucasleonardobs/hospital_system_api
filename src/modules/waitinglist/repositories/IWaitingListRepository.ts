import WaitingList from '../infra/typeorm/entities/WaitingList';

import IAddPatientInListDTO from '../dtos/IAddPatientInListDTO';
import IAttendPatientDTO from '../dtos/IAttendPatientDTO';
import IRemovePatientFromListDTO from '../dtos/IRemovePatientFromListDTO';

interface IWaitingListRepository {
    addPatient(data: IAddPatientInListDTO): Promise<WaitingList>;
    removePatient(data: IRemovePatientFromListDTO): Promise<void>;
    attendPatient(data: IAttendPatientDTO): Promise<WaitingList>;
    findAll(): Promise<WaitingList[]>;
    findByCpf(cpf: string): Promise<WaitingList | undefined>
}

export default IWaitingListRepository;
