const AppError = require("../errors/AppError")

const verifyRoles = (roles) => (req,res,next) => {
    const userRole = req.body.role
    const authorized = roles.every(role => userRole.includes(role))

    if(!authorized) throw new AppError('Unauthorized',401)
    next()
}


module.exports =  verifyRoles