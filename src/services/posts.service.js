const db = require("./db.service");
const statusPost = require("../constants/status");

const get = () => db.query("SELECT * FROM post");
const create = (title, desc, user_id) =>
  db.query(
    `INSERT post (title,description,user_id,status,created_at) VALUES (?,?,?,?,?)`,
    [title, desc, user_id, statusPost.PENDING, new Date()]
  );

const findOne = async (key, value) => {
  const data = await db.query(`SELECT * FROM post WHERE ${key} = ?`, [value]);
  return data[0];
};

module.exports = { get, create, findOne };
