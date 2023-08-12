const db = require("./db.service");

const getAll = () => db.query(`SELECT * FROM roles`);
const findRoles = async (key, value) => {
  const data = await db.query(`SELECT * FROM roles WHERE ? = ?`, [key, value]);
  return data[0];
};
const getRolesUser = (user_id) =>
  db.query(
    `SELECT role FROM userroles join roles on userroles.id_role = roles.id WHERE id_user = ?`,
    [user_id]
  );

const updateRole = (user_id,role) =>db.query(`INSERT INTO userroles (id_user,id_role) values (?,?)`,[user_id,role])

module.exports = { findRoles, getAll, getRolesUser,updateRole };
