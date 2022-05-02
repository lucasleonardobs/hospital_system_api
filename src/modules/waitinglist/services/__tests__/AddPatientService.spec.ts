import AppError from '../../../../shared/errors/AppError';

import FakeWaitingListRepository from '../../repositories/fakes/FakeWaitingListRepository';

import AddPatientService from '../AddPatientService';

describe('AddPatientInWaitingList', () => {
    const patient = {
        name: "Matheus Aragão",
        date_of_birth: new Date(),
        phone_number: "81999998888",
        cpf: "111.222.333-44",
        cep: "20222-222",
        address: "Rua dos Funkeiros, No 30, Pinheiros, Recife",
        gender: 'female'
    }

    it('should be able to add patient in waiting list', async () => {
        const fakeWaitingListRepository = new FakeWaitingListRepository();

        const addPatient = new AddPatientService(
            fakeWaitingListRepository,
        );

        const patientInWaitingList = await addPatient.execute({ cpf: patient.cpf, priority: 0 })

        expect(patientInWaitingList).toHaveProperty('attended');
        expect(patientInWaitingList).toHaveProperty('id');
    });

    it('should not be able to add a new patient with same CPF in waiting list', async () => {
        const fakeWaitingListRepository = new FakeWaitingListRepository();

        const addPatient = new AddPatientService(
            fakeWaitingListRepository,
        );

        await addPatient.execute({ cpf: patient.cpf, priority: 0 })

        expect(
            addPatient.execute({ cpf: patient.cpf, priority: 0 }
        )).rejects.toBeInstanceOf(AppError);
    });
});
