import Patient from '../infra/typeorm/entities/Patient';

import ICreatePatientDTO from '../dtos/ICreatePatientDTO';
import IUpdatePatientDTO from '../dtos/IUpdatePatientDTO';
import IDeletePatientDTO from '../dtos/IDeletePatientDTO';

interface IPatientsRepository {
    findByCpf(cpf: string): Promise<Patient | undefined>;
    create(data: ICreatePatientDTO): Promise<Patient>;
    update(data: IUpdatePatientDTO): Promise<Patient>;
    delete(data: IDeletePatientDTO): Promise<void>
}

export default IPatientsRepository;
