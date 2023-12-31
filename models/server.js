const express = require('express');
const cors = require('cors');
const {dbConnection} = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.authPath = "/api/auth";
    this.usuariosPath = "/api/usuarios";
    this.categoriasPath = "/api/categorias";
    this.productosPath = "/api/productos";
    this.buscarPath = "/api/buscar";
    this.ventasPath = "/api/ventas";
   
    this.conectarDB();

   
    this.middlewares();

    
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    
    this.app.use(cors());

    this.app.use(express.json());

    
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.authPath, require("../routes/auth"));
    this.app.use(this.usuariosPath, require("../routes/usuarios"));
    this.app.use(this.categoriasPath, require("../routes/categorias"));
    this.app.use(this.productosPath, require("../routes/productos"));
    this.app.use(this.buscarPath, require("../routes/buscar"));
    this.app.use(this.ventasPath, require("../routes/ventas"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server online port:", this.port);
    });
  }
}

module.exports = Server;