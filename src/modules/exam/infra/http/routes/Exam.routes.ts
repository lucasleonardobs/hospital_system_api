import { Router } from 'express';

import createExamValidator from '../validators/CreateExamValidator';
import deleteExamValidator from '../validators/DeleteExamValidator';
import showExamValidator from '../validators/ShowExamValidator';

import ExamController from '../controllers/ExamController';

const examRouter = Router();
const examController = new ExamController();

examRouter.post('/', createExamValidator, examController.create);
examRouter.delete('/:cpf', deleteExamValidator, examController.delete);
examRouter.get('/', examController.index);
examRouter.get('/:cpf', showExamValidator, examController.show);

export default examRouter;
