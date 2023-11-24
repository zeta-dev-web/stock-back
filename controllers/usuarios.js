const { request, response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");

const usuariosGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;

  

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments({ state: true }),
    Usuario.find({ state: true }).limit(limite).skip(desde),
  ]);

  
  res.status(200).json({
    total,
    usuarios,
  });
};

const usuarioPost = async (req = request, res) => {
  const { name, email, password, role } = req.body;

  const usuario = new Usuario({ name, email, password, role });

  
  const existeEmail = await Usuario.findOne({ email });
  if (existeEmail) {
    return res.status(400).json({
      msg: `El correo ${email} ya está registrado`,
    });
  }

  const salt = bcrypt.genSaltSync();
  usuario.password = bcrypt.hashSync(password, salt);

  await usuario.save();

  res.status(201).json({
    message: "Usuario creado",
    usuario, 
  });
};

const usuarioPut = async (req = request, res) => {
  const { id } = req.params;

  const { password, _id, email, state, ...resto } = req.body;

  if (state !== undefined) {
    // Si state está presente en el cuerpo de la solicitud, lo incluimos en el objeto resto
    resto.state = state;
  }

  const salt = bcrypt.genSaltSync();
  resto.password = bcrypt.hashSync(password, salt);

  const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

  res.status(200).json({
    message: "Usuario actualizado",
    usuario,
  });
};

const usuarioDelete = async (req, res) => {
  const { id } = req.params;

  

  const usuarioBorrado = await Usuario.findByIdAndUpdate(
    id,
    {
      state: false,
    },
    { new: true }
  );

  res.status(200).json({
    message: "Usuario eliminado",
    usuarioBorrado,
  });
};

module.exports = {
  usuariosGet,
  usuarioPost,
  usuarioPut,
  usuarioDelete,
};
