const express = require("express");
const cors = require("cors");
const mongoose =  require("mongoose");
//const { dbConnection } = require('../database/config')

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.usuariosPath = `/api/usuarios`;
    this.authPath     = `/api/auth`;


    //Conectar a BD

    mongoose.connect('mongodb://127.0.0.1:27017/restserver',(err, res)=>{
      if(err){
        console.log('Error en la BD');
        throw err;
      }else{
        console.log('BD online');
      }
    });

   
    // this.conectarDB();

    //Middelwares
    this.middlewares();

    //Rutas de la app
    this.routes();
  }

  // async conectarDB(){
  //   await dbConnection
  // }

  middlewares() {
    //Directorio publico
    this.app.use(express.static("public"));
    //CORS
    this.app.use(cors());
    //Lectura y parseo del body
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.usuariosPath, require(`../routes/user.routes`));
    this.app.use(this.authPath, require(`../routes/auth.routes`));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en`, this.port);
    });
  }
}

module.exports = Server;
