const { response } = require("express");
const { ObjectId } = require("mongoose").Types;
const { User, Categoria, Producto } = require("../models");

const coleccionesPermitidas = ["usuarios", "productos", "categorias", "roles"];

const buscarUsuario = async (termino = "", res = response) => {
  const esMongoID = ObjectId.isValid(termino); //TRUE
  if (esMongoID) {
    const usuario = await User.findById(termino);
    res.json({
      results: usuario ? [usuario] : [],
    });
  }

  const regex = new RegExp(termino, "i");

  const usuarios = await User.find({
    $or: [{ name: regex }, { correo: regex }],
    $and: [{ state: true }],
  });

  res.json({
    results: usuarios,
  });
};

const buscarProductos = async (termino = "", res = response) => {
  const esMongoID = ObjectId.isValid(termino); //TRUE
  if (esMongoID) {
    const producto = await Producto.findById(termino).populate(
      "categoria",
      "nombre"
    );
    res.json({
      results: producto ? [producto] : [],
    });
  }

  const regex = new RegExp(termino, "i");

  const productos = await Producto.find({ nombre: regex }).populate(
    "categoria",
    "nombre"
  );

  res.json({
    results: productos,
  });
};

const buscarCategorias = async (termino = "", res = response) => {
  const esMongoID = ObjectId.isValid(termino); //TRUE
  if (esMongoID) {
    const categoria = await Categoria.findById(termino);
    res.json({
      results: categoria ? [categoria] : [],
    });
  }

  const regex = new RegExp(termino, "i");

  const categorias = await Categoria.find({ nombre: regex });

  res.json({
    results: categorias,
  });
};

const buscar = (req, res = response) => {
  const { coleccion, termino } = req.params;

  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son ${coleccionesPermitidas}`,
    });
  }
  switch (coleccion) {
    case "usuarios":
      buscarUsuario(termino, res);
      break;
    case "categorias":
      buscarCategorias(termino, res);
      break;
    case "productos":
      buscarProductos(termino, res);
      break;

    default:
      res.status(500).json({
        msg: `Se me olvido hacer esta busqueda`,
      });
  }
};

module.exports = {
  buscar,
};
