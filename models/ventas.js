const { Schema, model } = require("mongoose");

const VentasSchema = Schema({
   usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  date: {
    type: String,
   required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  total: {
     type: Number,
    default: 0,
    required: true,
  },
  estado: {
    type: Boolean,
    default: true, //
  },
});


module.exports = model("Ventas", VentasSchema);
