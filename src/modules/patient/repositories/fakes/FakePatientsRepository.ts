import ICreatePatientDTO from '../../dtos/ICreatePatientDTO';
import IDeletePatientDTO from '../../dtos/IDeletePatientDTO';

import IPatientsRepository from '../IPatientsRepository';

import Patient from '../../infra/typeorm/entities/Patient';
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

    public async delete({ cpf }: IDeletePatientDTO): Promise<void> {
        const filtered = this.patients.filter(patient => patient.cpf !== cpf);
        this.patients = filtered;
    }
    
}

export default PatientsRepository;
