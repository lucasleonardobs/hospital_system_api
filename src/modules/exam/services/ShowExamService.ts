import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import Exam from '../infra/typeorm/entities/Exam';
import IExamsRepository from '../repositories/IExamsRepository';

interface IRequest {
    cpf: string;
}

@injectable()
class ShowExamService {
    constructor(
        @inject('ExamsRepository')
        private examsRepository: IExamsRepository,
    ) {}

    public async execute({ cpf }: IRequest): Promise<Exam> {
        const patientExam = await this.examsRepository.findByCpf(cpf);

        if (!patientExam) {
            throw new AppError('Exam not scheduled to this person.', 404);
        }

        return patientExam;
    };
}

export default ShowExamService;
