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
    
    const client = new Client({

        user: 'postgres',
        host: 'localhost',
        database: 'medical',
        password: 'darjan1234',
        port: 5432
    
    });

    client.connect()
        .then(()=> {
            return client.query('SELECT * FROM meds');
        })
        .then((results)=>{
            console.log(results);
            res.render('meds', results);
        })
        
    
});

app.get('/add', (req,res)=>{
    res.render('med-form');
});

app.post('/meds/add', (req,res)=>{
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


app.post('/meds/delete/:id', (req,res)=>{

    const client = new Client({

        user: 'postgres',
        host: 'localhost',
        database: 'medical',
        password: 'darjan1234',
        port: 5432
    
    });

    client.connect()
        .then(()=> {
            const query = ('DELETE FROM meds WHERE id=$1');
            const params = [req.params.id];
            return client.query(query,params);
        })
        .then((result)=> {
            res.redirect('/meds');
        })
});

app.listen(1502, ()=> {
    console.log('Listening to port 1502.');
});