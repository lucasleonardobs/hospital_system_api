import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import Exam from '../infra/typeorm/entities/Exam';
import IExamsRepository from '../repositories/IExamsRepository';

interface IRequest {
    cpf: string;
    exam: string;
    doctor_name: string;
    scheduled_at: Date;
}

@injectable()
class CreateExamService {
    constructor(
        @inject('ExamsRepository')
        private examsRepository: IExamsRepository,
    ) {}

    public async execute({ cpf, exam, doctor_name, scheduled_at }: IRequest): Promise<Exam> {
        const checkPatientExam = await this.examsRepository.findByCpf(cpf);

        if (checkPatientExam) {
            throw new AppError('Exam already scheduled to this patient.');
        };

        const patientExam = await this.examsRepository.create({
            cpf,
            exam,
            doctor_name,
            scheduled_at,
        });

        return patientExam;
    }
}

export default CreateExamService;
