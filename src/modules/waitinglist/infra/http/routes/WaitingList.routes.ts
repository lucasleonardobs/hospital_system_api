import { Router } from 'express';

import addPatientValidator from '../validators/AddPatientValidator';
import attendPatientValidator from '../validators/AttendPatientValidator';
import removePatientValidator from '../validators/RemovePatientValidator';
import showAPatientInListValidator from '../validators/ShowAPatientInListValidator';
import listWaitingListValidator from '../validators/ListWaitingListValidator';

import WaitingListController from '../controllers/WaitingListController';

const waitingListRouter = Router();
const waitingListController = new WaitingListController();

waitingListRouter.post('/', addPatientValidator, waitingListController.addPatient);
waitingListRouter.patch('/:cpf', attendPatientValidator, waitingListController.attendPatient);
waitingListRouter.delete('/:cpf', removePatientValidator, waitingListController.removePatient);
waitingListRouter.get('/', listWaitingListValidator, waitingListController.index);
waitingListRouter.get('/:cpf', showAPatientInListValidator, waitingListController.show);

export default waitingListRouter;
