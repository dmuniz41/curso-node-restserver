const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  borrarProducto,
} = require("../controllers/producto.controller");
const {
  existeProductoPorID,
  existeCategoriaPorID,
} = require("../helpers/db-validators");
const { validarCampos, esAdminRole, tieneRol } = require("../middlewares");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

// Listar todas las Productos- publico

router.get("/", obtenerProductos);

// Obtener una Producto - publico

router.get(
  "/:id",
  [
    check("id", "No es un id de Mongo valido").isMongoId(),
    check("id").custom(existeProductoPorID),
    validarCampos,
  ],
  obtenerProducto
);

// Crear Producto - privado - culaquier persona con un token valido

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("categoria", "No es un ID de Mongo valido ").isMongoId(),
    check("categoria").custom(existeCategoriaPorID),
  ],
  validarCampos,
  crearProducto
);

// Actualizar Producto -privado -cualquier persona con un token valido

router.put(
  "/:id",
  [
    validarJWT,
    // check("categoria", "No es un ID de Mongo valido ").isMongoId(),
    check("id").custom(existeProductoPorID),
    validarCampos,
  ],
  actualizarProducto
);

// Borrar una Producto - ADMIN

router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un Id de Mongo valido").isMongoId(),
    check("id").custom(existeProductoPorID),
    validarCampos,
  ],
  borrarProducto
);

module.exports = router;
