const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
  name: {
    type: String,
    require: [true, "El nombre es obligatorio"],
  },
  password: {
    type: String,
    require: [true, "La contraseña es obligatoria"],
  },

  correo: {
    type: String,
    require: [true, "El correo es obligatorio"],
    unique: true,
  },

  img: {
    type: String,
  },
  rol: {
    type: String,
    require: true,
  },

  state: {
    type: Boolean,
    default: true,
  },

  google: {
    type: Boolean,
    default: false,
  },
});

UsuarioSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject();
  return user;
};

module.exports = model("User", UsuarioSchema);
