const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');

const app = express();
const mustache = mustacheExpress();
mustache.cache = null;
app.engine('mustache', mustache);
app.set('view engine', 'mustache');

app.use(express.static('public'));

app.get('/meds', (req,res)=> {
    res.render('meds');
});

app.get('/add', (req,res)=>{
    res.render('med-form');
});

app.post('/meds/add', (req,res)=>{
    res.redirect('/meds');
})

app.listen(1502, ()=> {
    console.log('Listening to port 1502.');
});