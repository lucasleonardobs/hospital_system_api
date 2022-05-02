import { Router } from 'express';

import addPatientValidator from '../validators/AddPatientValidator';
import attendPatientValidator from '../validators/AttendPatientValidator';

import WaitingListController from '../controllers/WaitingListController';

const waitingListRouter = Router();
const waitingListController = new WaitingListController();

waitingListRouter.post('/', addPatientValidator, waitingListController.addPatient);
waitingListRouter.patch('/:cpf', attendPatientValidator, waitingListController.attendPatient);
waitingListRouter.delete('/:cpf', waitingListController.removePatient);
waitingListRouter.get('/', waitingListController.index)
waitingListRouter.get('/:cpf', waitingListController.show);

export default waitingListRouter;
