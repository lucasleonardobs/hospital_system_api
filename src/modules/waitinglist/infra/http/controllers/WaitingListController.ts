import { container } from 'tsyringe';

import { Request, Response } from 'express';

import AddPatientService from '../../../services/AddPatientService';
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
        return response.json();
    };

    public async attendPatient(request: Request, response: Response): Promise<Response> {
        return response.json();
    };

    public async index(request: Request, response: Response): Promise<Response> {
        return response.json();
    };

    public async show(request: Request, response: Response): Promise<Response> {
        return response.json();
    };


};

export default WaitingListController;
