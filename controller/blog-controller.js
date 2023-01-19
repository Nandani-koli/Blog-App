const  mongoose = require('mongoose');
const Blog = require('../model/blog');
const User = require('../model/user');

module.exports = {
    getAllBlogs : async(req,res) => {
        let blogs;
        try{
            blogs = await Blog.find();
        }catch(err){
            return console.log(err);
        }
        if(!blogs)
        {
            return res.status(404).json({message : "No Blogs Found"});
        }
        return res.status(200).json({blogs});
    },

    addblog : async (req,res) => {
        const {title,description,image,user} = req.body;

        let existinguser;
        try{
            existinguser = await User.findById(user);
        }
        catch(err){
           return console.log(err);
        }
        if(!existinguser)
        {
            return res.status(404).json({message : "Could not found the user by this id"});
        }

        const blog = new Blog({
            title,description,image,user
        });

        try {
            const session = await mongoose.startSession();
            session.startTransaction();
            await blog.save({session});
            existinguser.blogs.push(blog);
            await existinguser.save({session});
            await session.commitTransaction();
        }
        catch (error) {
         console.log(error);
         return res.status(500).json({message :error});
        }

        return res.status(200).json({blog});
    },

    updateblog : async(req,res) => {
        const {title,description} = req.body;
        const blogid = req.params.id;
        let blog;
        try {
            blog = await Blog.findByIdAndUpdate(blogid,{
                title,description,
            });
        } catch (error) {
            return console.log(error);
        }

        if(!blog){
            return res.status(500).json({message : "unable to update blog"});
        }
        return res.status(200).json({blog});
    },

    getblog : async (req,res) =>{
        const blogid = req.params.id;
        let blog;
        try{
           blog = await Blog.findById(blogid);
        }catch(err){
           return console.log(err);
        }

        if(!blog)
        {
            return res.status(404).json({message : "No blog Found"});
        }
        return res.status(200).json({blog});
    },

    deleteblog : async (req,res) =>{
        const blogid = req.params.id;
        let blog;
        try{
            blog = await Blog.findByIdAndRemove(blogid).populate("user");
            await blog.user.blogs.pull(blog);
            await blog.user.save();
        }
        catch(err){
           return console.log(err);
        }
        if(!blog)
        {
            return res.status(500).json({message : "Unable to delete"});
        }
        return res.status(200).json({message : "Successfully delete"});
    },

    getUserBlogs : async (req,res) => {
        const userid = req.params.id;

        let userblogs;
        try{
            userblogs = await User.findById(userid).populate("blogs");
        }
        catch(err){
            console.log(err);
        }

        if(!userblogs){
            return res.status(404).json({message:"No blog Found"});
        }
        return res.status(200).json({blogs:userblogs});
    },
}