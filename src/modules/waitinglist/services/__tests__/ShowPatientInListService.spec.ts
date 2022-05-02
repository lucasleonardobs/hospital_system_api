import AppError from '../../../../shared/errors/AppError';

import FakeWaitingListRepository from '../../repositories/fakes/FakeWaitingListRepository';

import AddPatientService from '../AddPatientService';
import ShowAPatientInWaitingList from '../ShowPatientInListService';

describe('ShowAPatientInWaitingList', () => {
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

    it('should be able to show a patient from waiting list', async () => {
        const fakeWaitingListRepository = new FakeWaitingListRepository();

        const addPatient = new AddPatientService(
            fakeWaitingListRepository,
        );

        const showPatient = new ShowAPatientInWaitingList(
            fakeWaitingListRepository,
        );

        await addPatient.execute({ cpf: patient1.cpf, priority: 0 });
        await addPatient.execute({ cpf: patient2.cpf, priority: 1 });

        const showedPatient = await showPatient.execute({ cpf: patient2.cpf });

        expect(showedPatient.patient_cpf).toEqual(patient2.cpf);
        expect(showedPatient.priority).toEqual(1);
    });


    it('should be able to show a patient from waiting list', async () => {
        const fakeWaitingListRepository = new FakeWaitingListRepository();

        const showedPatient = new ShowAPatientInWaitingList(
            fakeWaitingListRepository,
        );

        expect(showedPatient.execute({ cpf: "CPF-INEXISTENTE" })).rejects.toBeInstanceOf(AppError);
    });
});
