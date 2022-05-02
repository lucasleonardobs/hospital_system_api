import { Router } from 'express';

import PatientController from '../controllers/PatientsController';

import createPatientValidator from '../validators/CreatePatientValidator';
import updatePatientValidator from '../validators/UpdatePatientValidator';
import deletePatientValidator from '../validators/DeletePatientValidator';
import showPatientValidator from '../validators/ShowPatientValidator';

const patientRouter = Router();
const patientController = new PatientController();

patientRouter.get('/', patientController.index);
patientRouter.get('/:cpf', showPatientValidator, patientController.show);
patientRouter.post('/', createPatientValidator, patientController.create);
patientRouter.delete('/:cpf', deletePatientValidator, patientController.delete);
patientRouter.put('/:cpf', updatePatientValidator, patientController.update);

export default patientRouter;
