const express = require('express');
const app = express();
require('./model/config');

const user = require('./routes/user-route');
const blog = require('./routes/blog-route');

//middlewares 
app.use(express.json());
app.use('/user',user);
app.use('/blog',blog)

app.get('/',(req,res) => {
    res.send("Hello Server");
});

app.listen(8080);