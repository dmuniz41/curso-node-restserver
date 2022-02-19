const express = require("express");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //Middelwares
    this.middlewares();

    //Rutas de la app
    this.routes();
  }

  middlewares() {
      //Directorio publico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.get("/hello_world", (req, res) => {
      res.send("Hello World");
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en`, this.port);
    });
  }
}

module.exports = Server;
