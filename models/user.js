const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({

    name: {
        type: String,
        require: [true, 'El nombre es obligatorio']
    },

    correo: {
        type: String,
        require: [true, 'El correo es obligatorio'],
        unique: true
    },

    img: {
        type: String
    },
    role: {
        type: String,
        require: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },

    state: {
        type: Boolean,
        default: true
    },

    google: {
        type: Boolean,
        default: false
    },
});

module.exports = model('User', UsuarioSchema);