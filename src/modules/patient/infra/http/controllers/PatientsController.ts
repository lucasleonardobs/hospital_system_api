import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePatientService from '../../../services/CreatePatientService';
import UpdatePatientService from '../../../services/UpdatePatientService';
import DeletePatientService from '../../../services/DeletePatientService';

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
            message: 'Order has been deleted with successful.',
        });
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

};

export default PatientsController;
