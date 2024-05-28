// import { DataTypes} from "sequelize";

// // const sequelize = new Sequelize('facebook', 'root', '', {
// //     host: 'localhost',
// //     dialect: 'mysql'
// //   });

//  const commentsModel = sequelize.define('coment',{
//   comments:{
//     type:DataTypes.STRING(400),
//   },
//   postId:{
//     type: DataTypes.INTEGER,
//     references:{
//       model:postModel,
//       key:'id',
//       onDelete: 'CASCADE'
//     }
//   },
//   userId:{
//     type: DataTypes.INTEGER,
//     references:{
//       model:userModel,
//       key:'id',
//       onDelete: 'CASCADE'
//     }
//   }
//  })

//  export default commentsModel