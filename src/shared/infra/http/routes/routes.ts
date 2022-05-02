import { Router } from 'express';

import patientsRouter from '../../../../modules/patient/infra/http/routes/Patients.routes';
import waitingListRouter from '../../../../modules/waitinglist/infra/http/routes/WaitingList.routes';

const routes = Router();

routes.use('/patients', patientsRouter);
routes.use('/waiting-list', waitingListRouter);

export default routes;
