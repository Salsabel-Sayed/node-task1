// import { dbConnection } from "../dataBase/dbConnection.js";
// import userModel from "./users.model";


// // ! get all users
// const getAllUsers = async(req,res)=>{
//     const getUsers = await userModel.findAll()
 
//     res.json(getUsers)
//  }
 

// // ! add users 
// const addUsers = async(req,res)=>{

//     // ? email unqiue 
//     const {email} =req.body
//     const isEmailExist = await userModel.findOne({where:{email}})
//     if(isEmailExist){
//       res.status(402).json({message:"exist"})
      
//     }else{
//       await userModel.create(req.body)
//     }
// }
// //  ? ///////////////////////////////////////////////////////////////////////////////////////////////

// // ! update users
// const updateUsers =async(req,res)=>{
//     const userId = req.params.id
//     let updateUser = await userModel.update(
//       { userName: req.body.userName, email: req.body.email },
//       {where:{
//         id:userId
//       }}
//   )
//   console.log("userId",userId)
  
//     res.json({message:" updated",updateUser})
//   }


// //  ? ///////////////////////////////////////////////////////////////////////////////////////////////

// // ! delete users

// const deleteUser = async(req,res)=>{
//   const userId = req.params.id;

//     // Delete related posts first
//     const posDel = await postModel.destroy({ where: { authorFK:userId } });
    
//     // Then delete the user
//     const deleted = await userModel.destroy({ where: { id: userId } });
  
//     if (deleted && posDel) {
//       res.status(201).json({ message: "User and related comments deleted" });
//     } else {
//       res.status(401).json({ message: "User not found" });
//     }
// }

// //! registration
// const registration = async(req,res)=>{
//     const {email,password} = req.body
//    hashedPassword = bcrypt.hashSync(password,10)
  
//     const isEmailExist = await userModel.findOne({where:{email}})
//     if(isEmailExist){
//       res.status(402).json({message:"email exist"})
//     }else{
//       await userModel.create(req.body).then((user)=>{
//         return res.status(201).json({message:"user created successfully",user})
//       }).catch((err)=>{
//         res.json({message:"somthing wrong",err})
//       })
      
//     }
//   }
  
  
//     // ! login
//     const login = async(req,res)=>{
//       const {email,password,isLogged} = req.body;
      
//       const existingUser = await userModel.findOne({ where: { email: email } });
     
//       if (existingUser) {
//         if (existingUser.email === email) {
//           await userModel.update({isLogged:isLogged},{where:{isLogged:true}})
//          return res.json({message:"user loged in"})
          
//         } else {
//          return res.json({ message: "Incorrect email" });
//         }
//       } else {
//         return res.json({ message: "User does not exist. Please register first." });
//       }
//     }
  
  
  
//   // ! logout 
//   const logout =async(req,res)=>{
//     const {email,isLogged} = req.body;
//     const existingUser = await userModel.findOne({ where: { email: email } });
    
//       if(existingUser.email === email){
//         await userModel.update({isLogged:isLogged},{where:{isLogged:false}})
//         return res.json({message:"user loged out"})
//       }else{
//         return res.json({message:"user not found"})
//       }
//   }
  

// sequelize.sync({alter:true})

//  export{
//     getAllUsers,
//     addUsers,
//     updateUsers,
//     deleteUser,
//     registration,
//     login,
//     logout

    
//  }
