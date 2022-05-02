import Patient from '../infra/typeorm/entities/Patient';

import ICreatePatientDTO from '../dtos/ICreatePatientDTO';
import IUpdatePatientDTO from '../dtos/IUpdatePatientDTO';
import IDeletePatientDTO from '../dtos/IDeletePatientDTO';

interface IPatientsRepository {
    create(data: ICreatePatientDTO): Promise<Patient>;
    delete(data: IDeletePatientDTO): Promise<void>
}

export default IPatientsRepository;
