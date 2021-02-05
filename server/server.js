const {menuItems} = require('./database-cafe');
const express = require('express');
const app = express();

app.use(express.json());

app.get('/menu', (req, res) => {
    console.log('get request made');
    res.json(menuItems);
});

app.listen(8000, ()=> console.log('listening at port 8000'));