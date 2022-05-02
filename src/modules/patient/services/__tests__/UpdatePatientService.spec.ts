import AppError from '../../../../shared/errors/AppError';

import FakePatientsRepository from '../../repositories/fakes/FakePatientsRepository';
import CreatePatientService from '../CreatePatientService';

import UpdatePatientService from '../UpdatePatientService';

describe('UpdatePatient', () => {
    it('should be able to update a patient', async () => {
        const fakePatientsRepository = new FakePatientsRepository();

        const createPatient = new CreatePatientService(
            fakePatientsRepository,
        );

        const updatePatient = new UpdatePatientService(
            fakePatientsRepository,
        );

        const patient = await createPatient.execute({
            cpf: "111.222.333-44",
            name: "Lucas Leonardo",
            date_of_birth: new Date(),
            phone_number: "81999998888",
            cep: "50555-555",
            address: "Rua dos Artistas, No 30, Pinheiros, Recife",
            gender: "male",
        });

        await updatePatient.execute({
            cpf: patient.cpf,
            name: "Banana",
            date_of_birth: patient.date_of_birth,
            phone_number: "00000000000",
            cep: "00000-000",
            address: "Rua das Bananas",
            gender: "female"
        })

        expect(patient.name).toBe('Banana');
        expect(patient.cep).toBe('00000-000');
        expect(patient.phone_number).toBe('00000000000');
        expect(patient.address).toBe('Rua das Bananas');
    });

    it('should be able to check patients exists.', async () => {
        const fakePatientsRepository = new FakePatientsRepository();

        const updatePatient = new UpdatePatientService(
            fakePatientsRepository,
        );

        expect(
            updatePatient.execute({
                name: "Banana",
                date_of_birth: new Date(),
                phone_number: "00000000000",
                cpf: "000.000.000-00",
                cep: "00000-000",
                address: "Rua dos Bananas",
                gender: "female",
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
