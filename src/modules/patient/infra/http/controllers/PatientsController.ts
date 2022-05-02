import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePatientService from '../../../services/CreatePatientService';

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
};

export default PatientsController;
