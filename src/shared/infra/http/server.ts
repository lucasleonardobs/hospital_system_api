import express, { NextFunction, Request, Response } from 'express';

import 'express-async-errors';
import 'reflect-metadata';

import routes from './routes/routes';
import '../typeorm/index';

const app = express();

app.use(express.json());
app.use(routes);

app.get("/healthcheck", (request: Request, response: Response) => {
    response.send("ok").status(200)
});

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333');
});
