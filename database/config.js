const mongoose =  require("mongoose");

const dbConnection = async()=>{
  try {

    console.log('Base de datos online')   
    await mongoose.connect('mongodb://127.0.0.1:27017/restserver');

  } catch (error) {
    throw new Error('Error al iniciar la BD')
  }
}

module.exports = {
  dbConnection
}



// const {Pool} = require('pg');

// const pool = new Pool ({
//   host: 'localhost',
//   user: 'postgres',
//   password: 'postgres',
//   database: 'restserver',
//   port: '5432'
// })

// module.exports = {
//     pool
// }