const { response } = require("express");
const User = require("../models/user");
const { generarJWT } = require("../helpers/generar-jwt");
const bcryptjs = require("bcryptjs");
// const { json } = require("express/lib/response");
// const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {
  const { correo, password } = req.body;

  try {
    // Verifiicar si el correo existe
    const usuario = await User.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos (correo)",
      });
    }
    // Si el usuario esta activo
    if (!usuario.state) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos (state)",
      });
    }
    // Verificar la contrasenna
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos (password)",
      });
    }

    // Generar el JSWT
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

// const googleSignIn = async (req, res = response) => {
//   const id_token = req.body;
//   try {
//     const googleUser = await googleVerify(id_token);
//     console.log(googleUser);
//     res.json({
//       msg: "Todo ok google sign in",
//     });
//   } catch (error) {
//     res.status(400).json({
//       msg: "Token de google no es valido",
//     });
//   }
// };

module.exports = {
  login,
  // googleSignIn,
};
