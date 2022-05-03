import { v4 } from 'uuid';

import ICreateExamDTO from '../../dtos/ICreateExamDTO';
import IDeleteExamDTO from '../../dtos/IDeleteExamDTO';

import IExamsRepository from '../IExamsRepository';

import Exam from '../../infra/typeorm/entities/Exam';

class ExamsRepository implements IExamsRepository {
    private exams: Exam[] = [];

    public async create({
        cpf,
        exam,
        doctor_name,
        scheduled_at,
    }: ICreateExamDTO): Promise<Exam> {
        const patientExam = new Exam();

        Object.assign(patientExam, {
            id: v4(),
            patient_cpf: cpf,
            exam,
            doctor_name,
            scheduled_at,
        });

        this.exams.push(patientExam);

        return patientExam;
    };

    public async delete({
        cpf
    }: IDeleteExamDTO): Promise<void> {
        const filtered = this.exams.filter(patient => patient.patient_cpf !== cpf);
        this.exams = filtered;
    };
    
    public async findByCpf(cpf: string): Promise<Exam | undefined> {
        const patientExam = this.exams.find(patientExam => patientExam.patient_cpf == cpf);

        return patientExam;
    };

    public async findAll(): Promise<Exam[]> {
        return this.exams;
    };
}

export default ExamsRepository;
