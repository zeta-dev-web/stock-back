
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { esAdminRole, tieneRol } = require("../middlewares/validar-role");
const {ventaExiste} = require("../helpers/db-validators");

const {
   ventaPost,
  obtenerVentas,
  obtenerVenta,
  actualizarVenta,
  borrarVenta,
  } = require("../controllers/ventas");

  const router = Router();

router.get("/", obtenerVentas);

router.get(
  "/:id",
  [
    check("id", "No es un id válido").isMongoId(),
   
    check("id").custom(ventaExiste),
    validarCampos,
  ],
  obtenerVenta
);

router.post(
  "/",
  [
    validarJWT, 
    tieneRol("ADMIN_ROLE", "USER_ROLE"),
  ],
  ventaPost
);

router.put(
  "/:id",
  [
    validarJWT,
    
    esAdminRole,
    check("id", "No es un id válido").isMongoId(),
    
    check("id").custom(ventaExiste),
    validarCampos,
  ],
  actualizarVenta
);

router.delete(
  "/:id",
  [
    validarJWT,
    
    esAdminRole,
    check("id", "No es un id válido").isMongoId(),
    validarCampos,
  ],
  borrarVenta
);

module.exports = router;