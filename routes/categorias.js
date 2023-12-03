const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { esAdminRole, tieneRol } = require("../middlewares/validar-role");


const { categoriaExiste } = require("../helpers/db-validators");

const {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria,
} = require("../controllers/categorias");

const router = Router();

router.get("/", obtenerCategorias);

router.get(
  "/:id",
  [
    check("id", "No es un id válido").isMongoId(),
   
    check("id").custom(categoriaExiste),
    validarCampos,
  ],
  obtenerCategoria
);

router.post(
  "/",
  [
    validarJWT, 
    tieneRol("ADMIN_ROLE", "GERENTE"),
    check("nombre", "El nombre es obligatorio").notEmpty(),
  ],
  crearCategoria
);

router.put(
  "/:id",
  [
    validarJWT,
    
    esAdminRole,
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(categoriaExiste),
    validarCampos,
  ],
  actualizarCategoria
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
  borrarCategoria
);

module.exports = router;
