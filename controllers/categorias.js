const { request, response } = require("express");
const Categoria = require("../models/categoria");

const obtenerCategorias = async (req = request, res = response) => {
  const { desde = 0 } = req.query;

  const [total, categorias] = await Promise.all([
    Categoria.countDocuments(),
    Categoria.find()
    .sort({ nombre: 1 })
      .skip(desde)
      .populate("usuario", "name email"),
   
  ]);

  res.status(200).json({
    total,
    categorias,
  });
};

const obtenerCategoria = async (req = request, res = response) => {
  const { id } = req.params;
  const categoria = await Categoria.findById(id).populate(
    "usuario",
    "name email"
  );
  
  res.status(200).json({
    categoria,
  });
};

const crearCategoria = async (req = request, res = response) => {
  const nombre = req.body.nombre.toUpperCase();
  const categoriaDB = await Categoria.findOne({ nombre });

 
  if (categoriaDB) {
    return res.status(400).json({
      msg: `La categoria ${categoriaDB.nombre} ya existe`,
    });
  }

  
  const data = {
    nombre,
    usuario: req.usuario._id,
  };

  const categoria = new Categoria(data);
  await categoria.save();
  res.status(200).json(categoria);
};

const actualizarCategoria = async (req = request, res = response) => {
  const { id } = req.params;
  const { estado } = req.body;   
  const usuario = req.usuario._id;

  const datos = {
    estado,
    usuario,
  };

  const categoria = await Categoria.findByIdAndUpdate(id, datos, { new: true });

  res.status(200).json({
    categoria,
  });
};

const borrarCategoria = async (req = request, res = response) => {
  const { id } = req.params;

  const categoriaBorrada = await Categoria.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );
  res.status(200).json({
    msg: "Categoría inactivada",
    categoriaBorrada,
  });
};

module.exports = {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria,
};
