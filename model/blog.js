const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    image :{
        type : String,
        required : true,
    },
    user :{
        type : mongoose.Types.ObjectId,
        ref : "users",
        required : true,
    }
});

module.exports = mongoose.model('blogs',blogSchema);
