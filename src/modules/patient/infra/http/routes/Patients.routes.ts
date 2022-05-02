import { Router } from 'express';

import PatientController from '../controllers/PatientsController';

import createPatientValidator from '../validators/CreatePatientValidator';
import updatePatientValidator from '../validators/UpdatePatientValidator';
import deletePatientValidator from '../validators/DeletePatientValidator';

const patientRouter = Router();
const patientController = new PatientController();

patientRouter.post('/', createPatientValidator, patientController.create);
patientRouter.delete('/:cpf', deletePatientValidator, patientController.delete);
patientRouter.put('/:cpf', updatePatientValidator, patientController.update);

export default patientRouter;
