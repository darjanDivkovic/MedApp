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

app.get('/meds/edit/:id', (req,res)=> {

    const client = new Client({

        user: 'postgres',
        host: 'localhost',
        database: 'medical',
        password: 'darjan1234',
        port: 5432
    
    });

    client.connect()
        .then(()=> {
            const query = 'SELECT * FROM meds WHERE id=$1';
            const params = [req.params.id];
            return client.query(query,params);
        })
        .then((result)=> {
            res.render('meds-edit', {med:result.rows[0]});
        });
});

app.post('/meds/edit/:id', (req,res)=>{
    const client = new Client({

        user: 'postgres',
        host: 'localhost',
        database: 'medical',
        password: 'darjan1234',
        port: 5432
    
    });

    client.connect()
        .then(()=> {
            const query = 'UPDATE meds SET name=$1, count=$2 WHERE id=$3';
            const params = [req.body.name, req.body.count, req.params.id];
            return client.query(query,params);
        })
        .then((result)=> {
            res.redirect('/meds');
        });
});

app.listen(1502, ()=> {
    console.log('Listening to port 1502.');
});