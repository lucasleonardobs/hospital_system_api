import FakeWaitingListRepository from '../../repositories/fakes/FakeWaitingListRepository';

import AddPatientService from '../AddPatientService';
import ListPatientsInWaitingListService from '../ListWaitingListService';

describe('ListPatientsInWaitingList', () => {
    const patient1 = {
        name: "Matheus Aragão",
        date_of_birth: new Date(),
        phone_number: "81999998888",
        cpf: "111.222.333-44",
        cep: "20222-222",
        address: "Rua dos Funkeiros, No 30, Pinheiros, Recife",
        gender: 'female'
    }

    const patient2 = {
        name: "Wesley Alves",
        date_of_birth: new Date(),
        phone_number: "81988887777",
        cpf: "22.222.333-44",
        cep: "20222-222",
        address: "Rua dos Funkeiros, No 31, Pinheiros, Recife",
        gender: 'female'
    }

    it('should be able to attend patient from waiting list', async () => {
        const fakeWaitingListRepository = new FakeWaitingListRepository();

        const addPatient = new AddPatientService(
            fakeWaitingListRepository,
        );

        const listPatients = new ListPatientsInWaitingListService(
            fakeWaitingListRepository,
        );

        await addPatient.execute({ cpf: patient1.cpf, priority: 0 });
        await addPatient.execute({ cpf: patient2.cpf, priority: 1 });

        const patients = await listPatients.execute({ filter: -1 });
    
        expect(patients).toHaveLength(2);

        const patientsFilter0 = await listPatients.execute({ filter: 0 });

        expect(patientsFilter0).toHaveLength(1);

        const patientsFilter1 = await listPatients.execute({ filter: 0 });
            
        expect(patientsFilter1).toHaveLength(1);

        const patientsFilter2 = await listPatients.execute({ filter: 2 });

        expect(patientsFilter2).toHaveLength(0);
        
    });
});
