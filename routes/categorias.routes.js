const { Router } = require("express");
const { check } = require("express-validator");
const { crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria, } = require("../controllers/categorias.controller");
const { existeCategoriaPorID } = require("../helpers/db-validators");
const { validarCampos, esAdminRole, tieneRol } = require("../middlewares");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

// Listar todas las categorias- publico

router.get("/", obtenerCategorias);

// Obtener una categoria - publico

router.get(
  "/:id",
  [
    check("id", "No es un id de Mongo valido").isMongoId(),
    check("id").custom(existeCategoriaPorID),
    validarCampos,
  ],
  obtenerCategoria
);

// Crear categoria - privado - culaquier persona con un token valido

router.post(
  "/",
  [validarJWT, check("nombre", "El nombre es obligatorio").not().isEmpty()],
  validarCampos,
  crearCategoria
);

// Actualizar categoria -privado -cualquier persona con un token valido

router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("id").custom(existeCategoriaPorID),
    validarCampos,
  ],
  actualizarCategoria
);

// Borrar una categoria - ADMIN

router.delete("/:id", [
  validarJWT,
  esAdminRole,
  check('id', 'No es un Id de Mongo valido').isMongoId(),
  validarCampos
], borrarCategoria);

module.exports = router;
