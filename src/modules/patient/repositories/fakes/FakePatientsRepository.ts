import ICreatePatientDTO from '../../dtos/ICreatePatientDTO';
import IUpdatePatientDTO from '../../dtos/IUpdatePatientDTO';
import IDeletePatientDTO from '../../dtos/IDeletePatientDTO';

import IPatientsRepository from '../IPatientsRepository';

import Patient from '../../infra/typeorm/entities/Patient';

import AppError from '../../../../shared/errors/AppError';

class PatientsRepository implements IPatientsRepository {
    private patients: Patient[] = [];

    public async create({
        name,
        date_of_birth,
        cpf,
        cep,
        address,
        phone_number
    }: ICreatePatientDTO): Promise<Patient> {
        const patient = new Patient();

        Object.assign(patient, {
            name,
            date_of_birth,
            cpf,
            cep,
            address,
            phone_number,
            created_at: new Date(),
        });

        this.patients.push(patient);

        return patient;
    }

    public async update({
        name,
        date_of_birth,
        cpf,
        cep,
        address,
        phone_number
    }: IUpdatePatientDTO): Promise<Patient> {
        const findPatient = await this.patients.find(patient => patient.cpf === cpf);

        if (!findPatient) {
            throw new AppError("Patient not found", 404);
        };

        findPatient.name = name;
        findPatient.date_of_birth = date_of_birth;
        findPatient.cpf = cpf;
        findPatient.cep = cep;
        findPatient.address = address;
        findPatient.phone_number = phone_number;

        return findPatient;
    }
    
    public async findByCpf(cpf: string): Promise<Patient | undefined> {
        const findPatient = this.patients.find(patient => patient.cpf === cpf);

        return findPatient;
    }

    public async delete({ cpf }: IDeletePatientDTO): Promise<void> {
        const filtered = this.patients.filter(patient => patient.cpf !== cpf);
        this.patients = filtered;
    }
    
    public async findAll(): Promise<Patient[] | undefined> {
        return this.patients;
    }
}

export default PatientsRepository;
