const AppError = require("../../errors/AppError");
const userService = require("../../services/user.service");
const roleService = require('../../services/role.service')

const get = async (req, res) => {
  const data = await userService.get();

  res.send(data);
};

const findOne = async (req, res) => {
  const { id } = req.params;

  if (!id) throw new Error("ID is required", 400);
  const findUser = await userService.findOne("id",id);
  if (!findUser) throw new AppError("Not found", 404);
  res.status(200).send(findUser);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!id) throw new Error("ID is required", 400);
  const findUser = await userService.findOne("id",id);
  if (!findUser) throw new AppError("Not found", 404);
  await userService.deleteUser(id);
  res.sendStatus(202);
};

const updateRole = async (req,res) => {
  // const {user_id,role} = req.body;
  // if(!user_id  || !role) throw new AppError('user_id and role is must be required',400)
  // const availableRole = await roleService.findRoles('role',role)

  // if(!availableRole) throw new AppError('not available role',400)
  // const userRole = await roleService.getRolesUser(user_id);

  // if()

}

module.exports = { get, findOne, deleteUser,updateRole };
