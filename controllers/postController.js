const Post = require("../models/Post.js");

exports.createScreen = (req,res) =>{
    res.render('create-post');
}

exports.create = (req,res) =>{
    let post = new Post(req.body,req.session.user._id);
    post.create().then(()=>{
        res.send("new post created!");
    }).catch((error)=>{
        res.send(error);
    });
}