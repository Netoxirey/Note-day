const http = require('http');
const app = require('./app');
const mongoConnect = require('./utils/mongo');

const server = http.createServer(app);

async function serverStart() {
    await mongoConnect();
    server.listen(process.env.PORT, () => {
        console.log(`listening port ${process.env.PORT}`);
    });
};

serverStart();