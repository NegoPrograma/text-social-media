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


exports.showPost = async (req,res) =>{
    try {
        let post = await Post.findPost(req.params.id);
        res.render('single-post',{post:post});
    } catch (error) {
        res.render('404');        
    }
}