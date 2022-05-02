import { v4 } from 'uuid';

import FakePatientsRepository from '../../repositories/fakes/FakePatientsRepository';

import CreatePatientService from '../CreatePatientService';
import ListPatientService from '../ListPatientService';

describe('ListOrder', () => {
    it('should be able to list Patient.', async () => {
        const fakePatientsRepository = new FakePatientsRepository();

        const createPatient = new CreatePatientService(fakePatientsRepository);
        const listPatient = new ListPatientService(fakePatientsRepository);

        await createPatient.execute({
            name: "Lucas Leonardo",
            date_of_birth: new Date(),
            phone_number: "81999998888",
            cpf: "111.222.333-44",
            cep: "50555-555",
            address: "Rua dos Artistas, No 30, Pinheiros, Recife",
            gender: 'male'
        });

        await createPatient.execute({
            name: 'Test2',
            address: 'Rua das Bananeiras',
            cep: '44444-444',
            cpf: '444.444.444-40',
            date_of_birth: new Date(2014-10-11),
            phone_number: '55944443333',
            gender: 'male'
        });

        const patientList = await listPatient.execute();

        expect(patientList).toHaveLength(2);
    });
});
