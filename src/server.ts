import express from 'express';
import bodyParser from 'body-parser';

const server = express();
const port = 3000;

server.use(bodyParser.json());

server.get('/', (req, res) => {
    res.send('Hello World!');
});

server.listen(port, () => {
    return console.log(`Listening @ http://localhost:${port}`);
})