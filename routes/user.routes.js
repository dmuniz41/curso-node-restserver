const { Router } = require("express");
const { check } = require("express-validator");
const {validarCampos} = require("../middlewares/validar-campos")
const {
  getUsers,
  putUsers,
  postUsers,
  deleteUsers,
  patchUsers,
} = require("../controllers/users.controller");

const router = Router();

router.get("/", getUsers);

router.put("/:id", putUsers);

router.post("/",[
  check("name", 'El nombre es obligatorio').not().isEmpty(),
  check("password", 'EL password debe ser de mas de 6 letras').isLength({min: 6}),
  check("correo", 'El correo no es válido').isEmail(),
  check("role", 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
  validarCampos
], postUsers);

router.patch("/", patchUsers);

router.delete("/", deleteUsers);


module.exports = router;
