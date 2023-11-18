const { Schema, model } = require("mongoose");

const VentaSchema = Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  email: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
  },
  time: {
    type: String,
    
  },

  date: {
    type: String,
   
    
  },
  total: {
    type: String,
  },
  state: {
    type: Boolean,
    default: true,
  },
});

// VentasSchema.methods.toJSON = function () {
//   const { __v, password, _id, ...usuario } = this.toObject();
//   usuario.uid = _id;
//   return usuario;
// };

module.exports = model("Ventas", VentasSchema);
