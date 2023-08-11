const ROLES = require("../constants/roles");
const db = require("./db.service");

const get = () => db.query(`SELECT * from users`);

const create = (username, password) =>
  db.query(
    `INSERT INTO users (username,password,role,created_at)  VALUES (?,?,?,?)`,
    [username, password, [ROLES.USER],new Date()]
  );

const findByName = (username) =>
  db.query("SELECT * FROM users WHERE username = ? LIMIT 1", [username]);

const findById = (id) => db.query(`SELECT * FROM users WHERE id = ?`,[id])

const deleteUser = (id) => db.query(`DELETE FROM users where id = ?`,[id])

module.exports = { get, findByName,create,findById,deleteUser };
