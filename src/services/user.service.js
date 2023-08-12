const db = require("./db.service");

const get = () => db.query(`SELECT * from users`);

const create = (username, password) =>
  db.query(
    `INSERT INTO users (username,password,created_at)  VALUES (?,?,?)`,
    [username, password,new Date()]
  );

const findOne = async (key,value) =>  {
  const data = await db.query(`SELECT * FROM users WHERE ${key} = ?`, [value])
  return data[0]
};

const update = async (keys,values,keyCondition,valueCondition) => {
  let queryUpdate = ''
  keys.forEach((key,index) => queryUpdate = queryUpdate + ` ${index === 0 ? "" : ","} ${key} = '${values[index]}'`)

  await db.query(`UPDATE users SET ${queryUpdate} where ${keyCondition} = ? `,[valueCondition])
}

const deleteUser = (id) => db.query(`DELETE FROM users where id = ?`,[id])

module.exports = { get,create,deleteUser,findOne,update };
