const { response, request } = require("express");
const Producto = require("../models/producto");


const obtenerProductos = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;

  try {
    const [total, productos] = await Promise.all([
      Producto.countDocuments(),
      Producto.find()
        .sort({ nombre: 1 })
        .skip(Number(desde))
        .limit(Number(limite))
        .populate("categoria", "nombre")
        .populate("usuario", "email"),
    ]);

    res.json({
      total,
      productos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error al obtener los productos",
    });
  }
};


const obtenerProducto = async (req = request, res = response) => {
  const { id } = req.params;

  const producto = await Producto.findById(id)
    .populate("categoria", "nombre")
    .populate("usuario", "email");

  res.json({
    producto,
  });
};

const productoPost = async (req, res) => {
  const { precio, categoria, descripcion, img, stock } = req.body;

  const nombre = req.body.nombre.toUpperCase();

  const productoDB = await Producto.findOne({ nombre });

  if (productoDB) {
    return res.status(400).json({
      msg: `El producto ${productoDB.nombre} ya existe`,
    });
  }
  
  const data = {
    nombre,
    categoria,
    precio,
    descripcion,
    img,
    stock,
    usuario: req.usuario._id,
  };

  const producto = new Producto(data);

  
  await producto.save();

  res.status(201).json({
    msg: "Se agregó producto",
  });
};



const actualizarProducto = async (req, res) => {
  const { id } = req.params;
  const { precio, categoria, descripcion, disponible, estado } = req.body;
  const usuario = req.usuario._id;

  let data = {
    precio,
    descripcion,
    categoria,
    disponible,
    usuario,
    estado,
  };

  if (req.body.nombre) {
    data.nombre = req.body.nombre.toUpperCase();
  }

  if (req.body.stock) {
    data.stock = req.body.stock;
  }
  if (req.body.img) {
    data.img = req.body.img;
  }

  const producto = await Producto.findByIdAndUpdate(id, data, { new: true })
    .populate("categoria", "nombre")
    .populate("usuario", "email");

  res.status(200).json(producto);
};


const borrarProducto = async (req, res) => {
  const { id } = req.params;

  try {
    const productoBorrado = await Producto.findOneAndDelete({ _id: id });

    if (!productoBorrado) {
      return res.status(404).json({
        mensaje: "Producto no encontrado",
      });
    }

    res.json({
      mensaje: "Producto eliminado",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error al intentar borrar el producto",
    });
  }
};

module.exports = {
  productoPost,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  borrarProducto,
};
