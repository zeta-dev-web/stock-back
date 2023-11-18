const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { esAdminRole, tieneRol } = require("../middlewares/validar-role");

const {
    obtenerVentas,
    actualizarVentas,
    borrarVentas,
    obtenerVenta,
    ventaPost,
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
    tieneRol("ADMIN_ROLE", "GERENTE"),
    check("nombre", "El nombre es obligatorio").notEmpty(),
  ],
  crearventa
);

router.put(
  "/:id",
  [
    validarJWT,
    
    esAdminRole,
    check("id", "No es un id válido").isMongoId(),
    
    check("id").custom(ventaExiste),
    check("nombre", "El nombre es obligatorio").notEmpty(),
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
    
    check("id").custom(categoriaExiste),
    validarCampos,
  ],
  borrarVenta
);

module.exports = router;
