import express, { Request, Response, NextFunction } from 'express';
import { errors } from 'celebrate';

import 'express-async-errors';
import '../typeorm/index';

import routes from './routes/routes';
import AppError from '../../errors/AppError';

const app = express();

app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }
  
    console.error(err);
  
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
});

app.use(errors());

app.get("/healthcheck", (_: Request, response: Response) => {
    response.send("ok").status(200)
});

app.listen(3333, () => {
    console.log('🚀 Server started on port 3333');
});
