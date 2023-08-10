const userService = require('../services/user.service')
const get = async (req,res) => {
    const data = await userService.get()

    console.log('data',data)
    res.send(data)
}


module.exports = {get}