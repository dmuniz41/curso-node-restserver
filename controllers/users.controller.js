const { response } = require("express");

const getUsers = (req, res = response) => {
  res.json({
    msg: `get API - getUsers`,
  });
};
const postUsers = (req, res = response) => {
  res.json({
    msg: `post API - postUsers`,
  });
};
const putUsers = (req, res = response) => {
  res.json({
    msg: `put API - putUsers`,
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
