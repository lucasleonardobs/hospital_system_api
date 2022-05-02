import { inject, injectable } from 'tsyringe';

import IPatientsRepository from '../repositories/IPatientsRepository';
import Patient from '../infra/typeorm/entities/Patient';

@injectable()
class ListPatientService {
    constructor(
        @inject('PatientsRepository')
        private patientsRepository: IPatientsRepository,
    ) {}

    public async execute(): Promise<Patient[] | undefined> {
        const patients = await this.patientsRepository.findAll();

        return patients;
    }
}

export default ListPatientService;
