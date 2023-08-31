import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

import { connectToDatabase } from './db';
import router from './routes';

const server = express();
const port = 3000;

server.use(bodyParser.json());

server.get('/', (req: Request, res: Response) => {
    res.send('Hello To Supply Chain Tracker & Tracer!');
});

server.use('/supplychain/api/v1', router);

connectToDatabase().then(() => {
    server.listen(port, () => {
        return console.log(`Listening @ http://localhost:${port}`);
    })
})