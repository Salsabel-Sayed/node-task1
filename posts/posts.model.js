
// import { DataTypes } from "sequelize";

// // const sequelize = new Sequelize('facebook', 'root', '', {
// //     host: 'localhost',
// //     dialect: 'mysql'
// //   });
// // * posts table
// const postModel = sequelize.define('post', {
//     title:{
//       type: DataTypes.STRING(100),
     
//     },
//     content:{
//       type: DataTypes.STRING(400),
      
//     },
//     authorFK:{
//       type:DataTypes.INTEGER,
//       references:{
//         model:userModel,
//         key:'id',
//         onDelete:'CASCADE'
//       }
//     }
//   })
  
//   export default postModel