import path from 'path'
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(path.join(__dirname, 'db.db'))
export default db