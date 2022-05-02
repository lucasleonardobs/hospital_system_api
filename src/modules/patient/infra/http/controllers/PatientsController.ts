import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePatientService from '../../../services/CreatePatientService';
import UpdatePatientService from '../../../services/UpdatePatientService';
import ShowOnePatientService from '../../../services/ShowOnePatientService';
import DeletePatientService from '../../../services/DeletePatientService';
import ListPatientService from '../../../services/ListPatientService';

class PatientsController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { name, date_of_birth, phone_number, cpf, cep, address, gender } = request.body;

        const createPatient = container.resolve(CreatePatientService);

        const patient = await createPatient.execute({
            name,
            date_of_birth, 
            phone_number,
            cpf, 
            cep, 
            address,
            gender
        });

        return response.json(patient)
    };

    public async delete(request: Request, response: Response): Promise<Response> {
        const { cpf } = request.params;

        const deletePatient = container.resolve(DeletePatientService);

        await deletePatient.execute({ cpf });

        return response.json({
            message: 'Patient has been deleted with successful.',
        });
    }

    public async index(request: Request, response: Response): Promise<Response> {
        const listPatientService = container.resolve(ListPatientService);
    
        const patients = await listPatientService.execute()
    
        return response.json(patients);
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const { cpf } = request.params;
        const { name, date_of_birth, phone_number, cep, address } = request.body;

        const updatePatient = container.resolve(UpdatePatientService);

        const updatedPatient = updatePatient.execute({
            cpf,
            name,
            date_of_birth,
            phone_number,
            cep,
            address
        });

        return response.json(updatedPatient);
    };

    public async show(request: Request, response: Response): Promise<Response> {
        const { cpf } = request.params;

        const showPatient = container.resolve(ShowOnePatientService);

        const patients = await showPatient.execute({ cpf });

        return response.json(patients);
    }
};

export default PatientsController;
