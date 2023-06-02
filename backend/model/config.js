require('dotenv').config();
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const db = process.env.dbURL;

mongoose.connect(db).then(() => {
    console.log("Connection successful");
}).catch((err) => console.log(err));

