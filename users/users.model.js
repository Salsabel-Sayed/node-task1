import { DataTypes} from "sequelize";
import bcrypt from "bcrypt"

// const sequelize = new Sequelize('facebook', 'root', '', {
//   host: 'localhost',
//   dialect: 'mysql'
// });
 //* usres table
//  const userModel = sequelize.define('user', {
//     userName:{
//       type: DataTypes.STRING(100),
     
//     },
//     email:{
//       type: DataTypes.STRING(200),
//     },
//     password:{
//       type: DataTypes.STRING(500),
//       set(value) {
//         const hashedPassword = bcrypt.hashSync(value, 10);
//         this.setDataValue('password', hashedPassword);
//       },

//     },
//     isLogged:{
//       type:DataTypes.BOOLEAN()
//     }
    
//   })

//   export default userModel
  