import AppError from '../../../../shared/errors/AppError';

import FakeWaitingListRepository from '../../repositories/fakes/FakeWaitingListRepository';

import AddPatientService from '../AddPatientService';
import AttendPatientService from '../AttendPatientService';

describe('AttendPatientFromWaitingList', () => {
    const patient = {
        name: "Matheus Aragão",
        date_of_birth: new Date(),
        phone_number: "81999998888",
        cpf: "111.222.333-44",
        cep: "20222-222",
        address: "Rua dos Funkeiros, No 30, Pinheiros, Recife",
        gender: 'female'
    }

    it('should be able to attend patient from waiting list', async () => {
        const fakeWaitingListRepository = new FakeWaitingListRepository();

        const addPatient = new AddPatientService(
            fakeWaitingListRepository,
        );

        const attendPatient = new AttendPatientService(
            fakeWaitingListRepository,
        );

        await addPatient.execute({ cpf: patient.cpf, priority: 0 })
        const attendedPatient = await attendPatient.execute({ cpf: patient.cpf });
    
        expect(attendedPatient.attended).toBeTruthy()
    });

    it('should not be able to attend patient if he isn\'t in waiting list', async () => {
        const fakeWaitingListRepository = new FakeWaitingListRepository();

        const attendPatient = new AttendPatientService(
            fakeWaitingListRepository,
        );

        expect(
            attendPatient.execute({ cpf: "CPF-INEXISTENTE" }
        )).rejects.toBeInstanceOf(AppError);
    });
});
