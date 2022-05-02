import AppError from '../../../../shared/errors/AppError';

import FakeWaitingListRepository from '../../repositories/fakes/FakeWaitingListRepository';

import AddPatientService from '../AddPatientService';
import ListPatientsInWaitingListService from '../ListWaitingListService';
import RemovePatientService from '../RemovePatientService';

describe('RemovePatientFromWaitingList', () => {
    const patient1 = {
        name: "Matheus Aragão",
        date_of_birth: new Date(),
        phone_number: "81999998888",
        cpf: "111.222.333-44",
        cep: "20222-222",
        address: "Rua dos Funkeiros, No 30, Pinheiros, Recife",
        gender: 'female'
    };

    const patient2 = {
        name: "Wesley Alves",
        date_of_birth: new Date(),
        phone_number: "81988887777",
        cpf: "22.222.333-44",
        cep: "20222-222",
        address: "Rua dos Funkeiros, No 31, Pinheiros, Recife",
        gender: 'female'
    };

    it('should be able to remove patient from waiting list', async () => {
        const fakeWaitingListRepository = new FakeWaitingListRepository();

        const addPatient = new AddPatientService(
            fakeWaitingListRepository,
        );

        const listPatients = new ListPatientsInWaitingListService(
            fakeWaitingListRepository,
        );

        const removePatient = new RemovePatientService(
            fakeWaitingListRepository,
        )

        await addPatient.execute({ cpf: patient1.cpf, priority: 0 });
        await addPatient.execute({ cpf: patient2.cpf, priority: 1 });

        const patients1 = await listPatients.execute({ filter: -1 });

        expect(patients1).toHaveLength(2);

        await removePatient.execute({ cpf: patient2.cpf })
        
        const patients2 = await listPatients.execute({ filter: -1 });
    
        expect(patients2).toHaveLength(1);
    });

    it('should be able to remove patient from waiting list', async () => {
        const fakeWaitingListRepository = new FakeWaitingListRepository();

        const removePatient = new RemovePatientService(
            fakeWaitingListRepository,
        );

        expect(removePatient.execute({ cpf: "CPF-INEXISTENTE" })).rejects.toBeInstanceOf(AppError);
    });
});
