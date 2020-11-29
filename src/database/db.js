const { Database } = require('sqlite3')

const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('./src/database/database.db')

module.exports = db

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
    
    const query = `
        INSERT INTO places (
            name,
            cep,
            image,
            state,
            city,
            address,
            number,
            items
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `

    const values = [
        "Colectoria",
        "60360332",
        "https://cdn.pixabay.com/photo/2016/11/23/15/49/bundle-1853667_640.jpg",
        "ceara",
        "fortaleza",
        "Rua professor leite gondim",
        "900",
        "Lâmpadas"
    ]

    // db.run(query, values, function(err) {
    //     if(err){
    //         return console.log(err)
    //     }

    //     console.log("Cadastrado com sucesso")
    //     console.log(this)
    // })

    db.all(`SELECT * FROM places`, function(err, rows) {
        if(err){
            return console.log(err)
        }

        console.log("Aqui estão seus registros")
        console.log(rows)
    })

    // db.run(`DELETE FROM places WHERE id = ?`, [13], function(err) {
    //     if(err){
    //         return console.log(err)
    //     }

    //     console.log("Registro deletado com sucesso") 
    // })
})

