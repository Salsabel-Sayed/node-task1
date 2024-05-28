// import commentsModel from './../models/comments.model';

// // !get 

// const getAllComments = (async (req,res)=>{
//     const getComments = await commentsModel.findAll()
//     res.json(getComments)
//   })
  
//   // !post
//   const addComments =(async (req,res)=>{
//     await commentsModel.create(req.body)
//     res.json({message:"added"})
//   })
  
//   // !put
  
//   const updateComments = (async (req,res)=>{
//     const commentsId = req.params.id
//     let updateComments = await commentsModel.update(
//       { content: req.body.content },
//       {where:{
      
//         id:commentsId
//       }}
//   )
//   console.log("updateComments",updateComments)
  
//     res.json({message:" updated",updateComments})
//   })
  
//   // ! delete
  
//   const deleteComments = (async (req,res)=>{
//     const commentId = req.params.id;
  
//         const commDel = await commentsModel.destroy({ where: { id:commentId } });
  
//       if (commDel) {
//         res.status(201).json({ message: "Post and related comments deleted" });
//       } else {
//         res.status(401).json({ message: "Post not found" });
//       }
//   })
//   export{
//     getAllComments,
//     addComments,
//     updateComments,
//     deleteComments

//   }