const { response } = require("express");
const User = require("../models/user");
const { pool } = require("../database/config");

const getUsers = async(req, res = response) => {
  const { q, nombre = `No Name`, apikey, page = 1, limit } = req.query;

  const response = await pool.query('SELECT * FROM users');

  res.json({
    msg: `get API - getUsers`,
    response,
  });
};
const postUsers = async (req, res = response) => {
  const body = req.body
  const { name, correo, img, role, state, google} = req.body;
  const response = await pool.query(
    "INSERT INTO users (name, correo, img, role, state, google) VALUES ($1, $2, $3, $4, $5, $6)",
    [name, correo, img, role, state, google]
  );
  const user = new User(body);

  res.json({
    msg: `post API - User Created`,
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
