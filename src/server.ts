import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { connectToDatabase } from './helpers';
import router from './routes';

const server = express();
const port = 3000;
// const corsOptions = {
//     origin: 'http://localhost:3001/', // move to .env
//     credentials: true,
//     optionSuccessStatus: 200
// }

server.use(cors());

server.use(bodyParser.json());

server.get('/', (req: Request, res: Response) => {
    res.send('Hello To Supply Chain Tracker & Tracer!');
});

server.use('/supplychain/api/v1', router);

connectToDatabase().then(() => {
    server.listen(port, () => {
        return console.log(`Listening to port ${port}`);
    })
});
