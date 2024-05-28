import express from 'express'
import { DataTypes, QueryTypes, Sequelize } from "sequelize";
import bcrypt from "bcrypt"
import cors from "cors"
const app = express()

const port =process.env.PORT || 3000


const sequelize = new Sequelize(`mysql://ujefirnu9tdydokw:iuWd0BMcBc9hxmujnsev@bnvs3hrb0w8q76juu2bg-mysql.services.clever-cloud.com:3306/bnvs3hrb0w8q76juu2bg`)


  // // catch err
  sequelize.authenticate().then(()=>{
    console.log('Connection has been established successfully.');

  }).catch(()=>{
    console.error('Unable to connect to the database:', error);
  })

  // //* usres table
  const userModel = sequelize.define('user', {
    userName:{
      type: DataTypes.STRING(100),
     
    },
    email:{
      type: DataTypes.STRING(200),
    },
    password:{
      type: DataTypes.STRING(500),
      set(value) {
        const hashedPassword = bcrypt.hashSync(value, 10);
        this.setDataValue('password', hashedPassword);
      },

    },
    isLogged:{
      type:DataTypes.BOOLEAN()
    }
    
  })


 // * posts table
 const postModel = sequelize.define('post', {
  title:{
    type: DataTypes.STRING(100),
   
  },
  content:{
    type: DataTypes.STRING(400),
    
  },
  authorFK:{
    type:DataTypes.INTEGER,
    references:{
      model:userModel,
      key:'id',
      onDelete:'CASCADE'
    }
  }
})

// * comments table
 const commentsModel = sequelize.define('coment',{
  comments:{
    type:DataTypes.STRING(400),
  },
  postId:{
    type: DataTypes.INTEGER,
    references:{
      model:postModel,
      key:'id',
      onDelete: 'CASCADE'
    }
  },
  userId:{
    type: DataTypes.INTEGER,
    references:{
      model:userModel,
      key:'id',
      onDelete: 'CASCADE'
    }
  }
 })
// ****************************************************************************************************************************************/
 app.use(express.json())
 app.use(cors())


//  *creats users

// !get
app.get("/users",async (req,res)=>{
   const getUsers = await userModel.findAll()

   res.json(getUsers)
})

// !post
app.post("/users",async (req,res)=>{

  // ? email unqiue 
  const {email} =req.body
  const isEmailExist = await userModel.findOne({where:{email}})
  if(isEmailExist){
    res.status(402).json({message:"exist"})
    
  }else{
    await userModel.create(req.body);
    res.status(201).json({message:"not exist , add it"})
  }
})

// !put 
app.put("/users/:id",async (req,res)=>{
  const userId = req.params.id
  let updateUser = await userModel.update(
    { userName: req.body.userName, email: req.body.email },
    {where:{
      id:userId
    }}
)
console.log("userId",userId)

  res.json({message:" updated",updateUser})
})

// !delete 
app.delete("/users/:id",async (req,res)=>{
  const userId = req.params.id;

    // Delete related posts first
    const posDel = await postModel.destroy({ where: { authorFK:userId } });
    
    // Then delete the user
    const deleted = await userModel.destroy({ where: { id: userId } });
  
    if (deleted && posDel) {
      res.status(201).json({ message: "User and related comments deleted" });
    } else {
      res.status(401).json({ message: "User not found" });
    }
})

///////////////////////////////////////////////////////////////////////////////////////////////////
//  *creats posts
// !get

app.get("/posts",async (req,res)=>{
  const getPosts = await postModel.findAll()

  res.json(getPosts)
})

// !post
app.post("/posts",async (req,res)=>{
  await postModel.create(req.body)
  res.json({message:"added"})
})


// !put 
app.put("/posts/:id",async (req,res)=>{
  const postId = req.params.id
  let updatePost = await postModel.update(
    { title: req.body.title, content: req.body.content },
    {where:{
    
      id:postId
    }}
)
console.log("updatePost",updatePost)

  res.json({message:" updated",updatePost})
})


// !delete 
app.delete("/posts/:id",async (req,res)=>{
  const PostId = req.params.id;

    // Then delete the post
    const deleted = await postModel.destroy({ where: { id: PostId } });
      // Delete related comments 
      const commDel = await commentsModel.destroy({ where: { postId: PostId } });

    if (deleted && commDel) {
      res.status(201).json({ message: "Post and related comments deleted" });
    } else {
      res.status(401).json({ message: "Post not found" });
    }
})


///? ////////////////////////////////////////////////////////////////////////////////////////////////
//  *creats comments

// !get 

app.get("/comments",async (req,res)=>{
  const getComments = await commentsModel.findAll()
  res.json(getComments)
})

// !post
app.post("/comments",async (req,res)=>{
  await commentsModel.create(req.body)
  res.json({message:"added"})
})

// !put

app.put("/comments/:id",async (req,res)=>{
  const commentsId = req.params.id
  let updateComments = await commentsModel.update(
    { content: req.body.content },
    {where:{
    
      id:commentsId
    }}
)
console.log("updateComments",updateComments)

  res.json({message:" updated",updateComments})
})

// ! delete

app.delete("/comments/:id",async (req,res)=>{
  const commentId = req.params.id;

      const commDel = await commentsModel.destroy({ where: { id:commentId } });

    if (commDel) {
      res.status(201).json({ message: "Post and related comments deleted" });
    } else {
      res.status(401).json({ message: "Post not found" });
    }
})

///////////////////////////////////////////////////////////////////////////////////////////////////

// ! get specific user with specific post and its comments

app.get("/user/:userId/post/:postId", async (req, res) => {
  const userId = +req.params.userId;
  const postId = +req.params.postId;

  const getUser = await userModel.findOne({ attributes: ["userName"], where: { id: userId } });
  const getPost = await postModel.findOne({ attributes: ["title", "content"], where: { id: postId } });
  const getComments = await commentsModel.findAll({ attributes: ["comments","postId","userId"], where: { postId: postId } });

  console.log("userId", userId);
  console.log("postId", postId);
  console.log("getUser:", getUser);
  console.log("getPost:", getPost);
  console.log("getComments:", getComments);
  
  if (getUser && getPost && getComments) {
    res.json({ getUser, getPost, getComments });
  } else {
    res.json({ message: "Something went wrong" });
  }
});

///////////////////////////////////////////////////////////////////////////////////////////////////

// ! get specific post with the author

app.get("/post/:postId/user/:userId",async (req,res)=>{
  const userId = +req.params.userId;
  const postId = +req.params.postId;

  const getUser = await userModel.findOne({attributes:["userName"]},{where:{id:userId}})
  const getPost = await postModel.findAll({ attributes:["title","content","authorFK"] },{where:{id:postId}})
  console.log("userId",userId);
  console.log("postId",postId);
  console.log("getUser:",getUser);
  console.log("getPost:",getPost);
 
  if(getUser && getPost){
    res.json({getPost,getUser})
  }else{
    res.json({message:" somthing wrong"})
  }

})


// ? ///////////////////////////////////////////////////////////////////////////////////


//! registration
app.post(("/registr"),async(req,res)=>{
  const {email,password} = req.body
 hashedPassword = bcrypt.hashSync(password,10)

  const isEmailExist = await userModel.findOne({where:{email}})
  if(isEmailExist){
    res.status(402).json({message:"email exist"})
  }else{
    await userModel.create(req.body).then((user)=>{
      return res.status(201).json({message:"user created successfully",user})
    }).catch((err)=>{
      res.json({message:"somthing wrong",err})
    })
    
  }
})


  // ! login
  app.post(("/login"),async(req,res)=>{
    const {email,password,isLogged} = req.body;
    
    const existingUser = await userModel.findOne({ where: { email: email } });
   
    if (existingUser) {
      if (existingUser.email === email) {
        await userModel.update({isLogged:isLogged},{where:{isLogged:true}})
       return res.json({message:"user loged in"})
        
      } else {
       return res.json({ message: "Incorrect email" });
      }
    } else {
      return res.json({ message: "User does not exist. Please register first." });
    }
  })



// ! logout 
app.post(("/logout"),async(req,res)=>{
  const {email,isLogged} = req.body;
  const existingUser = await userModel.findOne({ where: { email: email } });
  
    if(existingUser.email === email){
      await userModel.update({isLogged:isLogged},{where:{isLogged:false}})
      return res.json({message:"user loged out"})
    }else{
      return res.json({message:"user not found"})
    }
})




///////////////////////////////////////////////////////////////////////////////////////////////////
  sequelize.sync({alter:true})


app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))