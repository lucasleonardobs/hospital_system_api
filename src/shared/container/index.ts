import { container } from 'tsyringe';

import IPatientsRepository from '../../modules/patient/repositories/IPatientsRepository';
import PatientsRepository from '../../modules/patient/infra/typeorm/repositories/PatientsRepository';

import IWaitingListRepository from '../../modules/waitinglist/repositories/IWaitingListRepository';
import WaitingListRepository from '../../modules/waitinglist/infra/typeorm/repositories/WaitingListRepository';

import IExamRepository from '../../modules/exam/repositories/IExamsRepository';
import ExamsRepository from '../../modules/exam/infra/typeorm/repositories/ExamsRepository';

container.registerSingleton<IPatientsRepository>(
    'PatientsRepository',
    PatientsRepository,
);

container.registerSingleton<IWaitingListRepository>(
    'WaitingListRepository',
    WaitingListRepository,
);

container.registerSingleton<IExamRepository>(
    'ExamsRepository',
    ExamsRepository,
);
