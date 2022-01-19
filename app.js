const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser());

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'myfirstdb'
});

conn.connect(err => {
    if (err) {
        console.log(err);
    } else {
        console.log('db connected');
    }
})

app.listen(8000, () => {
    console.log('app started');
});

let dbData;

conn.query('SELECT * FROM todolist', (err, result, field) => {
    dbData = result;
});

app.get('/', (req, res) => {
    res.send(dbData);
});

app.post('/', (req, res) => {
    let data = [req.body.id, req.body.task, req.body.isDone];

    conn.query('INSERT INTO `todolist`(`id`, `task`, `isDone`) VALUES (?,?,?)', data, (err, result, field) => {
        !err ? res.json(result) : res.json(err);
    });
});