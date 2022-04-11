const { response } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");


const getUsers = async (req, res = response) => {

  const {limite = 5, desde = 0} = req.query;
  const query = {estado: true};

  const [total, usuarios] = await Promise.all([
      User.countDocuments(query),
      User.find(query)
        .skip(Number(desde))
       .limit(Number(limite))
  ])

  res.json({
    total,
    usuarios
  });
};
const postUsers = async (req, res = response) => {
  const {name, correo, password, rol} = req.body;
  const user = new User({name, correo, password, rol});
  
  //Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);
  
  //Guardar en BD
  await user.save()


  res.json({
    user,
  });
};
const putUsers = async (req, res = response) => {
  const { id } = req.params;
  const {_id, password, google, correo, ...resto } = req.body;

  if(password){
    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, resto);

  res.json({
    user
  });
};
const patchUsers = (req, res = response) => {
  res.json({
    msg: `patch API - patchUsers`,
  });
};
const deleteUsers = async(req, res = response) => {

  const {id} = req.params;

  const usuario = await User.findByIdAndUpdate(id, {state:false});

  res.json({
    usuario,
  });
};

module.exports = {
  getUsers,
  putUsers,
  postUsers,
  patchUsers,
  deleteUsers,
};
