import FakeExamsRepository from '../../repositories/fakes/FakeExamsRepository';

import CreateExamService from '../CreateExamService';
import ListExamsService from '../ListExamsService';

describe('ListExams', () => {
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

    it('should be able to attend patient from waiting list', async () => {
        const fakeExamsRepository = new FakeExamsRepository();

        const createExam = new CreateExamService(
            fakeExamsRepository,
        );

        const listExams = new ListExamsService(
            fakeExamsRepository,
        );

        await createExam.execute({
            cpf: patient1.cpf,
            doctor_name: "Washington",
            exam: "Eletrocardiograma",
            scheduled_at: new Date(),
        });

        await createExam.execute({
            cpf: patient2.cpf,
            doctor_name: "Guilherme",
            exam: "Pneumetria",
            scheduled_at: new Date(),
        });

        const exams = await listExams.execute();
    
        expect(exams).toHaveLength(2);
    });
});
