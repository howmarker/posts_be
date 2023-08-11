const AppError = require("../errors/AppError");
const userService = require("../services/user.service");
const bcrypt = require("bcrypt");

const get = async (req, res) => {
  const data = await userService.get();

  res.send(data);
};

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

const findOne = async(req,res) => {
    const {id} = req.params

    if(!id) throw new Error('ID is required',400)
    const findUser = await userService.findById(id);
    if(findUser.length === 0) throw new AppError('Not found',404)
    res.status(200).send(findUser[0])
}

const deleteUser = async(req,res) => {
    const {id} = req.params

    if(!id) throw new Error('ID is required',400)
    const findUser = await userService.findById(id);
    if(findUser.length === 0) throw new AppError('Not found',404)
    await userService.deleteUser(id)
    res.sendStatus(202)
}

module.exports = { get, create,findOne,deleteUser };
