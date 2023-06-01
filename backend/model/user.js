const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        minlength : 6
    },
    blogs : [{
        type : mongoose.Types.ObjectId,
        ref : "blogs",
        required : true,
    }]
});

module.exports = mongoose.model('users',userSchema);
