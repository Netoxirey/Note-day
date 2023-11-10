const mongoose = require('mongoose');

async function mongoConnect() {
    return await mongoose.connect(process.env.MONGO_URI);
}

mongoose.connection.once('open', () => {
    console.log('Connected to Mongodb');
});

mongoose.connection.on('error', (error) =>{
    console.error(error);
});

module.exports = mongoConnect;