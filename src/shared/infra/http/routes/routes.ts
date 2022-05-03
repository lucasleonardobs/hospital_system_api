import { Router } from 'express';

import patientsRouter from '../../../../modules/patient/infra/http/routes/Patients.routes';
import waitingListRouter from '../../../../modules/waitinglist/infra/http/routes/WaitingList.routes';
import examsRouter from '../../../../modules/exam/infra/http/routes/Exam.routes';

const routes = Router();

routes.use('/patients', patientsRouter);
routes.use('/waiting-list', waitingListRouter);
routes.use('/exams', examsRouter);

export default routes;
