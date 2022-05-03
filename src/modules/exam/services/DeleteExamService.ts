import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import IExamsRepository from '../repositories/IExamsRepository';

interface IRequest {
    cpf: string;
}

@injectable()
class DeleteExamService {
    constructor(
        @inject('ExamsRepository')
        private examsRepository: IExamsRepository,
    ) {}

    public async execute({ cpf }: IRequest): Promise<void> {
        const checkPatientExam = await this.examsRepository.findByCpf(cpf);

        if (!checkPatientExam) {
            throw new AppError('Exam isn\'t scheduled to this patient.');
        };

        await this.examsRepository.delete({ cpf });   
    }
}

export default DeleteExamService;
