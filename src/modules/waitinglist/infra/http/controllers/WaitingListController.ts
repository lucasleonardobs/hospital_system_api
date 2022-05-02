import { Request, Response } from 'express';

class WaitingListController {
    public async addPatient(request: Request, response: Response): Promise<Response> {
        return response.json();
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
