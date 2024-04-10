
// const { Sequelize } = require('sequelize');
// const userModel = require('./models/LinkedinUser');

// const connection = async()=>{
// const sequelize = new Sequelize('Linkdin_Users_3.0', 'postgres', 'Nits@2024', {
//     host: 'localhost',
//     dialect: 'postgres' 
//   });
// let User = null;
//   try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//     User =  userModel(sequelize);
//    await sequelize.sync();
//    console.log("Table created");
//    return sequelize;
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// }
// module.exports = connection;

const { Sequelize } = require('sequelize');

// Replace 'database_name', 'username', 'password', 'localhost', and '5432' with your actual PostgreSQL credentials and database information
const sequelize = new Sequelize('postgres://postgres:Nits@2024@localhost:5432/Linkdin_Users_3.0');

module.exports = sequelize;

