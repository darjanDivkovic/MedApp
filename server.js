const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const { Client } = require('pg');

const app = express();
const mustache = mustacheExpress();
mustache.cache = null;
app.engine('mustache', mustache);
app.set('view engine', 'mustache');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));

app.get('/meds', (req,res)=> {
    res.render('meds');
});

app.get('/add', (req,res)=>{
    res.render('med-form');
});

app.post('/meds/add', (req,res)=>{
    console.log('post body', req.body);
    res.redirect('/meds');

    const client = new Client({

        user: 'postgres',
        host: 'localhost',
        database: 'medical',
        password: 'darjan1234',
        port: 5432

    });

    client.connect()
        .then(()=> {
            console.log('We are in boys!');
            const query = 'INSERT INTO meds(name,count) VALUES($1, $2)';
            const params = [req.body.name, req.body.count];
            return client.query(query,params);
        })
        .then((result)=> {
            res.redirect('/meds');
        });
})

app.listen(1502, ()=> {
    console.log('Listening to port 1502.');
});