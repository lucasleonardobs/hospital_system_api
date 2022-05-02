import { Router } from 'express';

import PatientController from '../controllers/PatientsController';

import createPatientValidator from '../validators/CreatePatientValidator';
import updatePatientValidator from '../validators/UpdatePatientValidator';
import showPatientValidator from '../validators/ShowPatientValidator';
import deletePatientValidator from '../validators/DeletePatientValidator';
import paginatePatientValidator from '../validators/PaginatePatientValidator';

const patientRouter = Router();
const patientController = new PatientController();

patientRouter.get('/', paginatePatientValidator, patientController.index)
patientRouter.get('/:cpf', showPatientValidator, patientController.show);
patientRouter.post('/', createPatientValidator, patientController.create);
patientRouter.put('/:cpf', updatePatientValidator, patientController.update);
patientRouter.delete('/:cpf', deletePatientValidator, patientController.delete);

export default patientRouter;
