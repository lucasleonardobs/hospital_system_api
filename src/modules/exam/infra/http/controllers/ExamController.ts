import { container } from 'tsyringe';

import { Request, Response } from 'express';

import CreateExamService from '../../../services/CreateExamService';
import DeleteExamService from '../../../services/DeleteExamService';
import ShowExamService from '../../../services/ShowExamService';
import ListExamsService from '../../../services/ListExamsService';

class ExamController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { cpf, exam, doctor_name, scheduled_at } = request.body;

        const createExam = container.resolve(CreateExamService);

        const patientExam = await createExam.execute({
            cpf,
            exam,
            doctor_name,
            scheduled_at,
        });

        return response.json(patientExam);
    };

    public async delete(request: Request, response: Response): Promise<Response> {
        const { cpf } = request.params;

        const deletePatient = container.resolve(DeleteExamService);

        await deletePatient.execute({ cpf });

        return response.json({
            message: 'The exam was canceled with successful.',
        });
    };

    public async index(_: Request, response: Response): Promise<Response> {
        const listExams = container.resolve(ListExamsService);

        const exams = await listExams.execute();

        return response.json(exams);
    };

    public async show(request: Request, response: Response): Promise<Response> {
        const { cpf } = request.params;

        const showExam = container.resolve(ShowExamService);

        const exam = await showExam.execute({ cpf });

        return response.json(exam);
    };
};

export default ExamController;
