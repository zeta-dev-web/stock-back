const { response, request } = require("express");
const Ventas = require("../models/ventas");

const obtenerVentas = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  try {
    const [total, ventas] = await Promise.all([
      Ventas.countDocuments(query),
      Ventas.find(query)
        .sort({ date: -1, time: -1 })
        .skip(Number(desde))
        .limit(Number(limite))
        .populate("usuario", "name"),
    ]);

    res.json({
      total,
      ventas,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error al obtener las ventas",
    });
  }
};

const obtenerVenta = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const venta = await Ventas.findById(id).populate("usuario", "name");

    res.json({
      venta,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error al obtener la venta",
    });
  }
};

const ventaPost = async (req, res) => {
  const { descripcion, total, date, time, pago } = req.body;

  try {
    const data = {
      pago,
        date,
        time,
      descripcion,
      total,
      usuario: req.usuario._id,
    };

    const venta = new Ventas(data);

    await venta.save();

    res.status(201).json({
      msg: "Se agregó la venta",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error al agregar la venta",
    });
  }
};

const actualizarVenta = async (req, res) => {
  const { id } = req.params;
  const { descripcion, total } = req.body;
  const usuario = req.usuario._id;

  const data = {
    descripcion,
    total,
    usuario,
  };

  try {
    const venta = await Ventas.findByIdAndUpdate(id, data, { new: true }).populate(
      "usuario",
      "nombre"
    );

    res.status(200).json(venta);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error al actualizar la venta",
    });
  }
};

const borrarVenta = async (req, res) => {
  const { id } = req.params;

  try {
    const ventaBorrada = await Ventas.findByIdAndUpdate(
      id,
      { estado: false },
      { new: true }
    );

    res.json({
      ventaBorrada,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error al borrar la venta",
    });
  }
};

module.exports = {
  ventaPost,
  obtenerVentas,
  obtenerVenta,
  actualizarVenta,
  borrarVenta,
};