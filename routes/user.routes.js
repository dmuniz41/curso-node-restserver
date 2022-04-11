const { Router } = require("express");
const { check } = require("express-validator");

const {
  validarCampos, 
  validarJWT, 
  esAdminRole, 
  tieneRol}
   = require('../middlewares'); 

const {esRolValido,emailExiste,existeUsuarioPorId} = require('../helpers/db-validators');

const {
  getUsers,
  putUsers,
  postUsers,
  deleteUsers,
  patchUsers,
} = require("../controllers/users.controller");

const router = Router();

router.get("/", getUsers);

router.put("/:id",[
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  check("rol").custom(esRolValido),
  validarCampos
], putUsers);

router.post("/",[
  check("name", 'El nombre es obligatorio').not().isEmpty(),
  check("password", 'EL password debe ser de mas de 6 letras').isLength({min: 6}),
  check("correo").custom(emailExiste),
  check("rol").custom(esRolValido),
   validarCampos
], postUsers);

router.patch("/", patchUsers);

router.delete("/:id",[
  validarJWT,
  // esAdminRole,  
  tieneRol("ADMIN_ROLE","VENTAS_ROLE"),
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  validarCampos,
], deleteUsers);


module.exports = router;
