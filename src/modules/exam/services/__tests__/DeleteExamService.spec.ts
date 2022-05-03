import AppError from '../../../../shared/errors/AppError';

import FakeExamsRepository from '../../repositories/fakes/FakeExamsRepository';

import CreateExamService from '../CreateExamService';
import ListExamsService from '../ListExamsService';
import DeleteExamService from '../DeleteExamService';

describe('DeleteExam', () => {
    const patient1 = {
        name: "Matheus Aragão",
        date_of_birth: new Date(),
        phone_number: "81999998888",
        cpf: "111.222.333-44",
        cep: "20222-222",
        address: "Rua dos Funkeiros, No 30, Pinheiros, Recife",
        gender: 'female'
    };

    const patient2 = {
        name: "Wesley Alves",
        date_of_birth: new Date(),
        phone_number: "81988887777",
        cpf: "22.222.333-44",
        cep: "20222-222",
        address: "Rua dos Funkeiros, No 31, Pinheiros, Recife",
        gender: 'female'
    };

    it('should be able to delete exam from exams', async () => {
        const fakeExamsRepository = new FakeExamsRepository();

        const createExam = new CreateExamService(
            fakeExamsRepository,
        );

        const deleteExams = new DeleteExamService(
            fakeExamsRepository,
        )

        const listExams = new ListExamsService(
            fakeExamsRepository,
        );

        await createExam.execute({
            cpf: patient1.cpf,
            doctor_name: "JV",
            exam: "Colonoscopia",
            scheduled_at: new Date(),
        });

        await createExam.execute({
            cpf: patient2.cpf,
            doctor_name: "Paulo Muzy",
            exam: "Eletromiografia",
            scheduled_at: new Date(),
        });

        const patients1 = await listExams.execute();

        expect(patients1).toHaveLength(2);

        await deleteExams.execute({ cpf: patient2.cpf })
        
        const patients2 = await listExams.execute();
    
        expect(patients2).toHaveLength(1);
    });

    it('should not be able to delete exam inexistent.', async () => {
        const fakeExamsRepository = new FakeExamsRepository();

        const deleteExams = new DeleteExamService(
            fakeExamsRepository,
        );

        expect(deleteExams.execute({ cpf: "CPF-INEXISTENTE" })).rejects.toBeInstanceOf(AppError);
    });
});
