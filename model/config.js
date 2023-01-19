const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const db = "mongodb+srv://nandanikoli:4H4g6csLz8uP9iRx@cluster0.5uacygb.mongodb.net/ClassicFashionBlog?retryWrites=true&w=majority";

mongoose.connect(db).then(() => {
    console.log("Connection successful");
}).catch((err) => console.log(err));

