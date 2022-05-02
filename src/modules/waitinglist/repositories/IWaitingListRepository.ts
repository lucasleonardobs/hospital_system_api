import WaitingList from '../infra/typeorm/entities/WaitingList';

interface IWaitingListRepository {
    addPatient(): Promise<WaitingList>;
    removePatient(): void;
    attendPatient(): Promise<WaitingList>;
    findAll(): Promise<WaitingList[]>;
    findById(): Promise<WaitingList>
}

export default IWaitingListRepository;
