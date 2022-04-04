const Role = require('../models/role')
const User = require('../models/user')


const esRolValido = async (rol = '') =>{
    const existeRol = await Role.findOne({rol})
    if(!existeRol){
      throw new Error(`El ${rol} no esta registrado en la BD`)
    }
  }

const emailExiste = async(correo = '') =>{
  const existeEmail = await User.findOne({correo})
  if(existeEmail){
    throw new Error(`Este correo ya esta registrado en la BD`)
  } 
}  
const existeUsuarioPorId = async(id) =>{
  const existeUsuario = await User.findById(id)
  if(!existeUsuario){
    throw new Error(`EL ID: ${id} no existe`)
  } 
}  
module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId
  }
  