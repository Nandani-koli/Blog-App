const bcrypt = require('bcryptjs');
const User = require('../model/user');

module.exports = {
    getallusers : async (req,res) =>{
        let users;
        try {
            users = await User.find();
        } catch (error) {
            console.log(error);
        }
        if (!users) {
            return res.status(404).json({message : "No user found"});
        } else {
            return res.status(200).json({users});
        }
    },

    signup : async(req,res) => {
        const {name,email,password} = req.body;
        let existinguser;
        try{
            existinguser = await User.findOne({email});
        }
        catch(err){
           return console.log(err);
        }
        if(existinguser)
        {
            return res.status(400).json({message : "User already exists! Login instead..."});
        }

        const hashedpass = bcrypt.hashSync(password);

        const user = new User({
            name,
            email,
            password : hashedpass,
            blogs : [],
        });

        try {
            user.save();
        } catch (err) {
            return console.log(err);
        }
        return res.status(201).json({user});
    },

    login : async(req,res) =>{
        const {email,password} = req.body;

        let existinguser;
        try{
            existinguser = await User.findOne({email});
        }
        catch(err){
           return console.log(err);
        }
        if(!existinguser)
        {
            return res.status(404).json({message : "Could not found the user by this email"});
        }

        const ispasscorrect = bcrypt.compareSync(password,existinguser.password);
        if(!ispasscorrect)
        {
            return res.status(400).json({message:"Incorrect password"});
        }
        return res.status(200).json({message : "Login Successfull"});

    }

}