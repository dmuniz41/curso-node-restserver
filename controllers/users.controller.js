const { response } = require("express");

const getUsers = (req, res = response) => {

    const {q, nombre = `No Name`, apikey, page = 1, limit} = req.query

  res.json({
    msg: `get API - getUsers`,
    q,
    nombre,
    apikey,
    page,
    limit
  });
};
const postUsers = (req, res = response) => {

    const {nombre, edad} = req.body;

  res.json({
    msg: `post API - postUsers`,
    nombre,
    edad
  });
};
const putUsers = (req, res = response) => {

    const {id} = req.params;

  res.json({
    msg: `put API - putUsers`,
    id
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
  deleteUsers
};
