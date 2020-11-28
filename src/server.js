const express = require('express')
const nunjucks = require('nunjucks')
const app = express()

app.use(express.static('public'));

nunjucks.configure(__dirname+'/views', {
    autoescape: true, 
    express: app
});

app.get('/', (req, res)=>{
    res.render('index.html')
})

app.get('/create-point', (req, res)=>{
    res.render('create-point.html')
})

app.get('/search-results', (req, res)=>{
    res.render('search-results.html')
})

app.listen(3000, () => {
    console.log('O servidor está rodando😎')
})
