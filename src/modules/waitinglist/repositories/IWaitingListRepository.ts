import WaitingList from '../infra/typeorm/entities/WaitingList';

import IAddPatientInListDTO from '../dtos/IAddPatientInListDTO';
import IAttendPatientDTO from '../dtos/IAttendPatientDTO';
import IRemovePatientFromListDTO from '../dtos/IRemovePatientFromListDTO';
import IFindAllDTO from '../dtos/IFindAllDTO';

interface IWaitingListRepository {
    addPatient(data: IAddPatientInListDTO): Promise<WaitingList>;
    removePatient(data: IRemovePatientFromListDTO): Promise<void>;
    attendPatient(data: IAttendPatientDTO): Promise<WaitingList>;
    findAll(filter: IFindAllDTO): Promise<WaitingList[]>;
    findByCpf(cpf: string): Promise<WaitingList | undefined>
}

export default IWaitingListRepository;
