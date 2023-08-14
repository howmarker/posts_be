const moment = require("moment/moment");
const statusPost = require("../../constants/status");
const AppError = require("../../errors/AppError");
const postService = require("../../services/posts.service");
const roleService = require('../../services/role.service')
const ROLES = require("../../constants/roles");

const getAll = async (req, res) => {
  const data = await postService.get();
  res.status(200).json(data);
};

const getOne = async (req, res) => {
  const id = req.params.id;
  if (!id) throw new AppError("ID is required", 400);
  const data = await postService.findOne("id", id);
  if (!data) throw new AppError("Not found", 404);
  res.status(200).json(data);
};

const create = async (req, res) => {
  const { title, desc, user_id } = req.body;
  if (!title || !desc)
    throw new AppError("title and description are required", 400);
  await postService.create(title, desc, user_id);
  res.sendStatus(201);
};

const changeStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!id) throw new AppError("ID is required", 400);
  const findPost = await postService.findOne("id", id);
  if (!findPost) throw new AppError("Not found", 404);

  if (!status || !Object.entries(statusPost).find((item) => item[1] === status))
    throw new AppError("status not in constants", 400);
  await postService.update(["status"], [status], "id", id);
  res.sendStatus(200);
};

const updateOne = async (req, res) => {
  const { id } = req.params;
  const { title, desc, user_id } = req.body;

  const findPost = await postService.findOne("id", id);

  if (!findPost) throw new AppError("not found", 404);
  if (findPost.user_id !== user_id) throw new AppError("unauthorized", 401);

  await postService.update(
    ["title", "description", "updated_at"],
    [
      title || findPost.title,
      desc || findPost.description,
      moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
    ],
    "id",
    id
  );

  res.sendStatus(200);
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.body;

  const findPost = await postService.findOne("id", id);
  const roleUser = await roleService.getRolesUser(user_id)

  const roles = roleUser.map(r => r.role)

  if (!findPost) throw new AppError("not found", 404);
  if (findPost.user_id !== user_id && !roles.find((r) => r === ROLES.ADMIN))
    throw new AppError("unauthorized", 401);
  postService.deletePost(id);

  res.sendStatus(200);
};

module.exports = {
  getAll,
  create,
  getOne,
  changeStatus,
  updateOne,
  deletePost,
};
