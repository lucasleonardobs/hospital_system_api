import Patient from '../infra/typeorm/entities/Patient';

import ICreatePatientDTO from '../dtos/ICreatePatientDTO';

interface IPatientsRepository {
    create(data: ICreatePatientDTO): Promise<Patient>;
}

export default IPatientsRepository;
