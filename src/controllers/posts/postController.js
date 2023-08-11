const statusPost = require("../../constants/status");
const AppError = require("../../errors/AppError");
const postService = require("../../services/posts.service");

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
  if (!title || !user_id)
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

// const updateOne = async(req,res) => {
//     const {id} = req.params
//     const {title,desc} = req.params
// }

module.exports = { getAll, create, getOne, changeStatus };
