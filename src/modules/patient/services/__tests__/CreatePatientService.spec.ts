import AppError from '../../../../shared/errors/AppError';

import FakePatientsRepository from '../../repositories/fakes/FakePatientsRepository';

import CreatePatientService from '../CreatePatientService';

describe('CreatePatient', () => {
    it('should be able to create a new patient', async () => {
        const fakePatientsRepository = new FakePatientsRepository();

        const createPatient = new CreatePatientService(
            fakePatientsRepository,
        );

        const patient = await createPatient.execute({
            name: "Lucas Leonardo",
            date_of_birth: new Date(),
            phone_number: "81999998888",
            cpf: "111.222.333-44",
            cep: "50555-555",
            address: "Rua dos Artistas, No 30, Pinheiros, Recife",
            gender: 'male'
        });

        expect(patient).toHaveProperty('created_at');
    });

    it('should not be able to create a new user with same CPF from another', async () => {
        const fakePatientsRepository = new FakePatientsRepository();

        const createPatient = new CreatePatientService(
            fakePatientsRepository,
        );

        await createPatient.execute({
            name: "Wesley Alves",
            date_of_birth: new Date(),
            phone_number: '81999998888',
            cpf: "111.222.333-44",
            cep: "30333-333",
            address: "Rua dos Louscos Paranoicos, No 30, Pinheiros, Recife",
            gender: 'male'
        });

        expect(
            createPatient.execute({
            name: "Matheus Aragão",
            date_of_birth: new Date(),
            phone_number: "81999998888",
            cpf: "111.222.333-44",
            cep: "20222-222",
            address: "Rua dos Funkeiros, No 30, Pinheiros, Recife",
            gender: 'female'
        })).rejects.toBeInstanceOf(AppError);
    });
});
