import { Router } from 'express';

import patientsRouter from '../../../../modules/patient/infra/http/routes/Patients.routes'

const routes = Router();

routes.use('/patients', patientsRouter)

export default routes;
