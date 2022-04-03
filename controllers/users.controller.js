const { response } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");
const { pool } = require("../database/config");

const getUsers = async (req, res = response) => {
  const { q, nombre = `No Name`, apikey, page = 1, limit } = req.query;

  const response = await pool.query("SELECT * FROM users");

  res.json({
    msg: `get API - getUsers`,
    response,
  });
};
const postUsers = async (req, res = response) => {
  const body = req.body;
  const { name, correo, img, role, state, google, password } = req.body;
  const user = new User({ name, correo, password, role });

  //Verificar si el correo existe
  const { rows } = await pool.query(
    "SELECT EXISTS(SELECT 1 FROM users WHERE correo = $1)",
    [correo]
  );
  const { exists } = rows[0];
  if (exists) {
    return res.status(400).json({
      correo,
      msg: "Este correo ya esta registrado",
    });
  }

  //Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  //Guardar en BD
  const response = await pool.query(
    "INSERT INTO users (name, correo, img, role, state, google, password) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    [name, correo, img, role, state, google, user.password]
  );

  res.json({
    user,
  });
};
const putUsers = (req, res = response) => {
  const { id } = req.params;

  res.json({
    msg: `put API - putUsers`,
    id,
  });
};
const patchUsers = (req, res = response) => {
  res.json({
    msg: `patch API - patchUsers`,
  });
};
const deleteUsers = (req, res = response) => {
  res.json({
    msg: `delete API - deleteUsers`,
  });
};

module.exports = {
  getUsers,
  putUsers,
  postUsers,
  patchUsers,
  deleteUsers,
};
