const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const { validarJWT } = require("../middlewares/validar-jwt");


const { login, obtenerID } = require("../controllers/auth");

const router = Router();

router.get("/", [validarJWT], obtenerID);
router.post(
  "/login",
  [
    check("email", "El formato de correo no es válido").isEmail(),
    check("email", "El correo es obligatorio").notEmpty(),
    check("password", "La contraseña es obligatoria").notEmpty(),
    check("password", "Debe tener mínimo 8 caracteres y máximo 16").matches(
      /^.{8,16}$/
    ),
    validarCampos,
  ],
  login
);



module.exports = router;