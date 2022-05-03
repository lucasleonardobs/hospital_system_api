import Exam from '../infra/typeorm/entities/Exam';

import IDeleteExamDTO from '../dtos/IDeleteExamDTO';
import ICreateExamDTO from '../dtos/ICreateExamDTO';

interface IExamsRepository {
    create(data: ICreateExamDTO): Promise<Exam>;
    delete(data: IDeleteExamDTO): Promise<void>;
    findAll(): Promise<Exam[]>;
    findByCpf(cpf: string): Promise<Exam | undefined>
}

export default IExamsRepository;
