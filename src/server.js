const express = require('express')
const nunjucks = require('nunjucks')
const app = express()
const db = require("./database/db")

//----config-----

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}))
nunjucks.configure(__dirname+'/views', {
    autoescape: true, 
    express: app
});

//---------routes------------

app.get('/', (req, res)=>{
    res.render('index.html')
})

app.get('/create-point', (req, res)=>{
    res.render('create-point.html')
})

app.post('/create-point', (req, res)=> {
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
        req.body.name,
        req.body.cep,
        req.body.image,
        req.body.state,
        req.body.city,
        req.body.address,
        req.body.number,
        req.body.items
    ]

    db.run(query, values, function(err) {
        if(err){
            return console.log(err)
        }

        console.log("Cadastrado com sucesso")
        console.log(this)
    })
    
    res.send('ok')
})

app.get('/search-results', (req, res)=>{
    const search = req.query.search

    if(search == "") {
        return res.render('search-results.html', {total: 0})
    }

    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err){
            return console.log(err)
        }

        const total = rows.length
        return res.render('search-results.html', { places: rows, total: total})
    })
})

app.listen(3000, () => {
    console.log('The server is running😎')
})
