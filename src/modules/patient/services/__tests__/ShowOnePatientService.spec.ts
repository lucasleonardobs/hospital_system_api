import AppError from '../../../../shared/errors/AppError';

import FakePatientsRepository from '../../repositories/fakes/FakePatientsRepository';

import CreateProductService from '../CreatePatientService';
import ShowOnePatientService from '../ShowOnePatientService';

describe('ShowOnePatient', () => {
    it('should be able to show one Patient.', async () => {
        const fakePatientsRepository = new FakePatientsRepository();
        const createPatient = new CreateProductService(fakePatientsRepository);
        const showOneProduct = new ShowOnePatientService(fakePatientsRepository);

        const patientTest = await createPatient.execute({
            name: 'Test1',
            address: 'Rua dos Testes',
            cep: '55555-555',
            cpf: '555.555.555-50',
            date_of_birth: new Date(2014-10-11),
            phone_number: '55955554444'
        });

        await createPatient.execute({
            name: 'Test2',
            address: 'Rua das Bananeiras',
            cep: '44444-444',
            cpf: '444.444.444-40',
            date_of_birth: new Date(2014-10-11),
            phone_number: '55944443333'
        });

        await createPatient.execute({
            name: 'Test3',
            address: 'Rua das Orquídeas',
            cep: '33333-333',
            cpf: '333.333.333-30',
            date_of_birth: new Date(2014-10-11),
            phone_number: '55933332222'
        });

        const patientShow = await showOneProduct.execute({ cpf: patientTest.cpf });

        expect(patientShow.name).toBe('Test1');
        expect(patientShow.address).toBe('Rua dos Testes');
        expect(patientShow.cep).toBe('55555-555');
        expect(patientShow.phone_number).toBe('55955554444');
    });

    it('should be able to check patients exists.', async () => {
        const fakePatientsRepository = new FakePatientsRepository();
        const showOnePatient  = new ShowOnePatientService(fakePatientsRepository);

        expect(showOnePatient.execute({ cpf: "CPF-INEXISTENTE" })).rejects.toBeInstanceOf(
            AppError,
        );
    });
});
