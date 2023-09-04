import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path'
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';

import { connectToDatabase, ENV } from './helpers';
import router from './routes';

const server = express();
const port = ENV.PORT;
// const corsOptions = {
//     origin: 'http://localhost:3001/', // move to .env
//     credentials: true,
//     optionSuccessStatus: 200
// }

server.use(cors());

server.use(bodyParser.json());

// Serve Swagger UI assets
server.use('/swagger-ui', express.static(path.join(__dirname, 'node_modules/swagger-ui-dist')));

// Serve Swagger UI
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

server.get('/', (req: Request, res: Response) => {
    res.send('Hello To Supply Chain Tracker & Tracer!');
});

server.use('/supplychain/api/v1', router);

connectToDatabase().then(() => {
    server.listen(port, () => {
        return true;
    })
});
