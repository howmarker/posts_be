const db = require("./db.service");

const getAll = () => db.query(`SELECT * FROM roles`);
const findRoles = (key, value) =>
  db.query(`SELECT * FROM roles WHERE ? = ?`, [key, value]);
const getRolesUser = (user_id) =>
  db.query(
    `SELECT role FROM userroles join roles on userroles.id_role = roles.id WHERE id_user = ?`,
    [user_id]
  );

module.exports = { findRoles, getAll, getRolesUser };
