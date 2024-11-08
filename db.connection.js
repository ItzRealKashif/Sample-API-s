require('dotenv').config();
const URI = process.env.MONGOURI;
const mongoose = require('mongoose');

mongoose.set('debug', true);

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ignoreUndefined: true,
}).then(() => {
    console.log(`We are connected to the database :)`)
}).catch((err) => {
    console.log(`Some error occured while connecting with the DB ======> ${err}`)
})