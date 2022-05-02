import { Router } from 'express';

import WaitingListController from '../controllers/WaitingListController';

const waitingListRouter = Router();
const waitingListController = new WaitingListController();

waitingListRouter.post('/', waitingListController.create);
// waitingListRouter.get('/', waitingListController.index)
// waitingListRouter.get('/:cpf', waitingListController.show);
// waitingListRouter.post('/', waitingListController.create);
// waitingListRouter.put('/:cpf', waitingListController.update);
// waitingListRouter.delete('/:cpf', waitingListController.delete);

export default waitingListRouter;
