import AppError from '../../../../shared/errors/AppError';

import FakeExamsRepository from '../../repositories/fakes/FakeExamsRepository';

import CreateExamService from '../CreateExamService';
import ShowExamService from '../ShowExamService';

describe('ShowExam', () => {
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

    it('should be able to show a exam by patient cpf from exams', async () => {
        const fakeExamsRepository = new FakeExamsRepository();

        const createExam = new CreateExamService(
            fakeExamsRepository,
        );

        const showExam = new ShowExamService(
            fakeExamsRepository,
        );

        await createExam.execute({ 
            cpf: patient1.cpf, 
            doctor_name: "João Gomes",
            exam: "Ultrassom",
            scheduled_at: new Date(),
        });
        await createExam.execute({ 
            cpf: patient2.cpf, 
            doctor_name: "Tarcísio da Acordeon",
            exam: "Urocultura",
            scheduled_at: new Date(),
        });

        const showedExam = await showExam.execute({ cpf: patient2.cpf });

        expect(showedExam.patient_cpf).toEqual(patient2.cpf);
    });


    it('should be able to show a exams thats no exists to patient.', async () => {
        const fakeExamsRepository = new FakeExamsRepository();

        const showedPatient = new ShowExamService(
            fakeExamsRepository,
        );

        expect(showedPatient.execute({ cpf: "CPF-INEXISTENTE" })).rejects.toBeInstanceOf(AppError);
    });
});
