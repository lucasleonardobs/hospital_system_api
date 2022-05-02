import AppError from '../../../../shared/errors/AppError';

import FakePatientsRepository from '../../repositories/fakes/FakePatientsRepository';

import CreatePatientService from '../CreatePatientService';
import DeletePatientService from '../DeletePatientService';

describe('DeletePatient', () => {
    it('should be able to delete a Patient', async () => {
        const fakePatientsRepository = new FakePatientsRepository();
        const createPatient = new CreatePatientService(fakePatientsRepository);
        const deletePatient = new DeletePatientService(fakePatientsRepository);

        const patientDeleteTest = await createPatient.execute({
            name: "Lucas Leonardo",
            date_of_birth: new Date(),
            phone_number: "81999998888",
            cpf: "111.222.333-44",
            cep: "50555-555",
            address: "Rua dos Artistas, No 30, Pinheiros, Recife"
        });

        const { cpf } = patientDeleteTest;

        await deletePatient.execute({ cpf });

        const find = await fakePatientsRepository.findByCpf(cpf);

        expect(find).toBeUndefined();
    });

    it('should be able to check patients exists.', async () => {
        const fakePatientsRepository = new FakePatientsRepository();

        const deletePatient = new DeletePatientService(fakePatientsRepository);

        expect(deletePatient.execute({ cpf: "CPF-INEXISTENTE" })).rejects.toBeInstanceOf(
            AppError,
        );
    });
});
