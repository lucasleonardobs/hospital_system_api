
import { inject, injectable } from 'tsyringe';

import Exam from '../infra/typeorm/entities/Exam';
import IExamsRepository from '../repositories/IExamsRepository';


@injectable()
class ListExamsService {
    constructor(
        @inject('ExamsRepository')
        private examsRepository: IExamsRepository,
    ) {}

    public async execute(): Promise<Exam[] | undefined> {
        const exams = await this.examsRepository.findAll();

        return exams;
    }
}

export default ListExamsService;
