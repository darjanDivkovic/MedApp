let express = require('express');

let app = express();
app.use(express.static('public'));

app.listen(1502, ()=> {
    console.log('Listening to port 1502.');
});