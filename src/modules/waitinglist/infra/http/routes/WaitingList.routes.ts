import { Router } from 'express';

import WaitingListController from '../controllers/WaitingListController';

const waitingListRouter = Router();
const waitingListController = new WaitingListController();

waitingListRouter.post('/', waitingListController.addPatient);
waitingListRouter.put('/:cpf', waitingListController.attendPatient);
waitingListRouter.delete('/:cpf', waitingListController.removePatient);
waitingListRouter.get('/', waitingListController.index)
waitingListRouter.get('/:cpf', waitingListController.show);

export default waitingListRouter;
