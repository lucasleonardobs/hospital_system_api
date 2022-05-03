import AppError from '../../../../shared/errors/AppError';

import FakeExamsRepository from '../../repositories/fakes/FakeExamsRepository';

import CreateExamService from '../CreateExamService';

describe('CreateExam', () => {
    const patient = {
        name: "Matheus Aragão",
        date_of_birth: new Date(),
        phone_number: "81999998888",
        cpf: "111.222.333-44",
        cep: "20222-222",
        address: "Rua dos Funkeiros, No 30, Pinheiros, Recife",
        gender: 'female'
    }

    it('should be able to create exam in exams.', async () => {
        const fakeExamsRepository = new FakeExamsRepository();

        const createExam = new CreateExamService(
            fakeExamsRepository,
        );

        const patientInWaitingList = await createExam.execute({
            cpf: patient.cpf,
            exam: "Endoscópia",
            doctor_name: "Drauzio Varela",
            scheduled_at: new Date(),
        });

        expect(patientInWaitingList).toHaveProperty('id');
    });

    it('should not be able to create exam with same CPF in exams.', async () => {
        const fakeExamsRepository = new FakeExamsRepository();

        const createExam = new CreateExamService(
            fakeExamsRepository,
        );

        await createExam.execute({
            cpf: patient.cpf,
            exam: "Endoscópia",
            doctor_name: "Drauzio Varela",
            scheduled_at: new Date(),
        });
        
        expect(
            createExam.execute({
                cpf: patient.cpf,
                exam: "Hemograma",
                doctor_name: "Wesley",
                scheduled_at: new Date(),
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});
