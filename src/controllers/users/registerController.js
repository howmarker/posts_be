const bcrypt = require("bcrypt");
const userService = require('../../services/user.service');
const AppError = require("../../errors/AppError");


const create = async (req, res) => {
    const { username, password: pwd } = req.body;
    if (!username || !pwd)
      throw new AppError("Username and password are requied", 400);
    const findOne = await userService.findByName(username);
    if (findOne.length > 0) throw new AppError(`${username} is existing in db`, 409);
    const password = bcrypt.hashSync(pwd, +process.env.ROUND_HASH);
  
    await userService.create(username, password);
    res.sendStatus(201)
  };

module.exports = create