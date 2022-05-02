import { container } from 'tsyringe';

import IPatientsRepository from '../../modules/patient/repositories/IPatientsRepository';
import PatientsRepository from '../../modules/patient/infra/typeorm/repositories/PatientsRepository';

container.registerSingleton<IPatientsRepository>(
    'PatientsRepository',
    PatientsRepository,
);
