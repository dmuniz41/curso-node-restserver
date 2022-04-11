const { response } = require('express')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

validarJWT = async(req, res = response, next)=>{

    const token = req.header('x-token')

    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {
        
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        
        // Leer el usuario que corresponde al UID
        const usuario = await User.findById(uid);

        if(!usuario){
            return res.status(410).json({
                msg: 'Token no valido (Usuario no existe en DB)'
            })
        }

        // Verificar si el UID tiene estado TRUE
        if(!usuario.state){
            return res.status(410).json({
                msg: 'Token no valido (State: False)'
            })
        }


        req.usuario = usuario;

        next();

    } catch (error) {
       console.log(error); 
       res.status(401).json({
           msg: 'Token no valido'
       })
    }

    // console.log(token);
}

module.exports = {
    validarJWT
}