import AppError from '../../../../../shared/errors/AppError';

import { getRepository, Repository } from 'typeorm';

import ICreateExamDTO from '../../../dtos/ICreateExamDTO';
import IDeleteExamDTO from '../../../dtos/IDeleteExamDTO';

import IExamRepository from '../../../repositories/IExamsRepository';

import Exam from '../entities/Exam';

class ExamRepository implements IExamRepository {
    private ormRepository: Repository<Exam>;

    constructor() {
        this.ormRepository = getRepository(Exam);
    };

    public async create({
        cpf,
        exam,
        doctor_name,
        scheduled_at,
    }: ICreateExamDTO): Promise<Exam> {
        const patientExam = this.ormRepository.create({
            patient_cpf: cpf,
            exam,
            doctor_name,
            scheduled_at,
        });

        await this.ormRepository.save(patientExam);

        return patientExam;
    };

    public async delete({
        cpf
    }: IDeleteExamDTO): Promise<void> {
        await this.ormRepository.createQueryBuilder()
            .where("patient_cpf = :patient_cpf", { 
                patient_cpf: cpf
            }).delete().execute();
    };

    public async findAll(): Promise<Exam[]> {
        const query = this.ormRepository.createQueryBuilder('exams')

        query.orderBy('scheduled_at', 'DESC')
        query.leftJoinAndSelect("exams.patient", "patients") 
        query.select([
            'exams.id', 'exams.patient_cpf', 'exams.exam', 'exams.doctor_name', 'exams.scheduled_at',
            'patients.name', 'patients.date_of_birth', 'patients.phone_number', 'patients.cep', 'patients.address', 'patients.gender']
        );

        const exams = await query.getMany();
    
        return exams
    };

    public async findByCpf(cpf: string): Promise<Exam | undefined> {
        const query = this.ormRepository.createQueryBuilder('exams');

        query.leftJoinAndSelect("exams.patient", "patients");
        query.select([
            'exams.id', 'exams.patient_cpf', 'exams.exam', 'exams.doctor_name', 'exams.scheduled_at',
            'patients.name', 'patients.date_of_birth', 'patients.phone_number', 'patients.cep', 'patients.address', 'patients.gender']
        );
        query.where({ patient_cpf: cpf });

        const exam = await query.getOne();
    
        return exam
    };
}

export default ExamRepository;
