const Post = require("../models/Post")
const { User } = require("../models/User")

Post = require("../models/Post")
User = require("../models/User")

exports.createPost=async(req,res)=>{
        body=req.body
        id= req.user
    try {
        const newPost=await new Post({author:id,...body})
        const savedPost= await newPost.save()
        
        await User.findByIdAndUpdate(id,{ $push: { posts: savedPost._id } },{new:true})
        res.status(201).json(savedPost)

    } catch (error) {
        res.json({message:error})
    }
}

exports.getSinglePost=  async(req,res)=>{
    const id=req.params
    try {
        const post= await Post.findById(id).populate('author')
        return res.status(200).json({message:post})

    } catch (error) {
        res.status(500).json({msg:"post not founf"})
    }

}

exports.getUserPost= async(req,res)=>{
    const id=req.params
    try{
        const posts= await Post.find({creator:id})
        return res.status(200).json({message:posts})
    }catch(error){
        return res.status(500).json({message:error})
    }

}

exports.deletePost= async (req,res)=>{
    const {postId}=req.params
    const {userId}=req.id
    post=await Post.findById(postId)
    if (!post){return res.json({msg:'post doesnt exist'})};    
    if (post.author!= userId) res.json({msg:'this is not your psot to delete'})

    try {

        const deletedPost = await psot.findByIdAndUpdate(postId) 
        await User.findByIdAndUpdate(post.author,{ $pull: { posts: post._id } },{new:true})
        res.status(200).json({message:deletedPost})

    } catch (error) {
        res.json({message:"we encountered preoblems dekleting this post"})
    }
}
exports.updatePost= async(req,res)=>{
    const {postId}=req.params
    const {userId}=req.id
    try {
        post= await Post.findById(postId)
        if (!post) res.status(400).json({msg:'post doesnt exist'})
        if  (post.author!= userId) res.status(400).json({message:'this is not your message to delete'})
        const updatedPost= await Post.findByIdAndUpdate(postId,req.body,{new:true})
    res.status(200).json({message:updatedPost})

    } catch (error) {
        res.status(500).json({message:error})
        
    }
}