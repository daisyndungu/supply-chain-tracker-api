import express from 'express';
import bodyParser from 'body-parser';

import { connectToDatabase } from './db';
import router from './routes';

const server = express();
const port = 3000;

server.use(bodyParser.json());

server.get('/', (req, res) => {
    res.send('Hello World!');
});

server.use('/api/v1', router);

connectToDatabase().then(() => {
    server.listen(port, () => {
        return console.log(`Listening @ http://localhost:${port}`);
    })
})