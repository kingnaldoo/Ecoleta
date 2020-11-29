const { Database } = require('sqlite3')

const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('./src/database/database.db')

db.serialize(()=>{
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            cep INTEGER,
            image TEXT,
            state TEXT,
            city TEXT,
            address TEXT,
            number INTEGER,
            items TEXT
        );
    `)
})

module.exports = db
