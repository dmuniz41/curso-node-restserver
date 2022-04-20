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
    default: "USER_ROLE",
    enum: ["ADMIN_ROLE", "USER_ROLE"],
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
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

module.exports = model("User", UsuarioSchema);
