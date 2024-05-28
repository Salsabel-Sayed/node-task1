
// import postModel from "./posts.model"
// import commentsModel from './../models/comments.model';

// // !get

// const getAllPosts = (async (req,res)=>{
//     const getPosts = await postModel.findAll()
//     res.json(getPosts)
//   })
  
//   // !post
//   const addPosts=(async(req,res)=>{
//     await postModel.create(req.body)
//     res.json({message:"added"})
//   })

//   // !put 
//   const updatePost =(async (req,res)=>{
//     const postId = req.params.id
//     let updatePost = await postModel.update(
//       { title: req.body.title, content: req.body.content },
//       {where:{
      
//         id:postId
//       }}
//   )
//   console.log("updatePost",updatePost)
  
//     res.json({message:" updated",updatePost})
//   })
  
  
//   // !delete 
//   const deletePost = (async(req,res)=>{
//     const PostId = req.params.id;
  
//       // Then delete the post
//       const deleted = await postModel.destroy({ where: { id: PostId } });
//         // Delete related comments 
//         const commDel = await commentsModel.destroy({ where: { postId: PostId } });
  
//       if (deleted && commDel) {
//         res.status(201).json({ message: "Post and related comments deleted" });
//       } else {
//         res.status(401).json({ message: "Post not found" });
//       }
//   })
  

//   export{
//     getAllPosts,
//     addPosts,
//     updatePost,
//     deletePost
//   }