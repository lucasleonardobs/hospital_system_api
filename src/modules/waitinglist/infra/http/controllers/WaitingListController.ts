import { container } from 'tsyringe';

import { Request, Response } from 'express';

import AddPatientService from '../../../services/AddPatientService';
import AttendPatientService from '../../../services/AttendPatientService';
import RemovePatientService from '../../../services/RemovePatientService';

class WaitingListController {
    public async addPatient(request: Request, response: Response): Promise<Response> {
        const { cpf, priority } = request.body;

        const addPatient = container.resolve(AddPatientService);

        const patientInList = addPatient.execute({
            cpf,
            priority
        });

        return response.json(patientInList);
    };

    public async removePatient(request: Request, response: Response): Promise<Response> {
        const { cpf } = request.params;

        const deletePatient = container.resolve(RemovePatientService);

        await deletePatient.execute({ cpf });

        return response.json({
            message: 'Patient has been remove from waiting list with successful.',
        });
    };

    public async attendPatient(request: Request, response: Response): Promise<Response> {
        const { cpf } = request.params;

        const attendPatient = container.resolve(AttendPatientService);

        const patientAttended = attendPatient.execute({ cpf});

        return response.json(patientAttended);
    };

    public async index(request: Request, response: Response): Promise<Response> {
        return response.json();
    };

    public async show(request: Request, response: Response): Promise<Response> {
        return response.json();
    };


};

export default WaitingListController;
