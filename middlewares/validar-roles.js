const { response } = require("express")




const esAdminRole = (req, res = response, next)=>{

    if(!req.usuario){
        return res.status(500).json({
            msg:'Se quiere verificar el rol sin verificar el token'
        })
    }

    const {rol, name} = req.usuario; 
    if(rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${name} no es administrador (No esta autorizado)`
        });
    }

    next();

}


const tieneRol = (...roles)=>{

    return (req, res = response, next) =>{

        if(!req.usuario){
            return res.status(500).json({
                msg:'Se quiere verificar el rol sin verificar el token'
            })
        }

        if(!roles.includes(req.usuario.rol)){
            
            return res.status(401).json({
                msg:`El servicio requiere uno de los siguientes roles ${roles}`
            });
        }

        next();
    }

}

module.exports ={
    esAdminRole,
    tieneRol
}