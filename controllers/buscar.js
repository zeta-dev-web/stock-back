const { request, response } = require("express");


const { ObjectId } = require("mongoose").Types;


const Categoria = require("../models/categoria");
const Producto = require("../models/producto");


const coleccionesPermitidas = ["categorias", "productos"];



const buscarCategoria = async (termino, res = response) => {
  
  const isMongoId = ObjectId.isValid(termino);
  if (isMongoId) {
    const categoria = await Categoria.findById(termino).populate(
      "usuario",
      "name"
    );
    return res.json({
      results: categoria ? [categoria] : [], 
    });
  }

  
  const regex = new RegExp(termino, "i");

  const categorias = await Categoria.find({
    nombre: regex,
    estado: true,
  }).populate("usuario", "name");

  res.json({
    results: categorias,
  });
};


const buscarProducto = async (termino, res = response) => {
  
  const isMongoId = ObjectId.isValid(termino);
  if (isMongoId) {
    const producto = await Producto.findById(termino)
      .populate("usuario", "name")
      .populate("categoria", "nombre");
    return res.json({
      results: producto ? [producto] : [], 
    });
  }

  
  const regex = new RegExp(termino, "i");

  const productos = await Producto.find({
    nombre: regex,
    estado: true,
  })
    .populate("usuario", "name")
    .populate("categoria", "nombre");

  res.json({
    results: productos,
  });
};



const buscar = async (req = request, res = response) => {
  
  const { coleccion, termino } = req.params;

  
  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son ${coleccionesPermitidas}`,
    });
  }

  switch (coleccion) {
    case "categorias":
      buscarCategoria(termino, res);
      break;
    case "productos":
      buscarProducto(termino, res);
      break;
    default:
      res.status(500).json({
        msg: "no se generaron las búsquedas",
      });
      break;
  }
};

module.exports = {
  buscar,
};
