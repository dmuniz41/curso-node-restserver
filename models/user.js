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
  role: {
    type: String,
    require: true,
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
  const { password, ...user } = this.toObject();
  return user;
};

module.exports = model("User", UsuarioSchema);
