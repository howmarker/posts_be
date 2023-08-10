const db = require('./db.service')

const get = () => db.query(`SELECT * from users`)

module.exports = {get}