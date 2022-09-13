const express = require('express');
const res = require('express/lib/response');
const mysql = require('mysql2');
const app = express();

app.use(express.urlencoded({extended: false}));

const connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'password',
  database: 'list_app'
});


app.get('/', (req,res) => {
  connection.query(
    'SELECT * FROM items',
    (error,results) => {
      res.render('top.ejs', {items: results});
    }
  );
});

app.get('/new', (req,res) => {
  res.render('new.ejs');
});

app.post('/create', (req, res) => {
  connection.query(
    'INSERT INTO items(name) VALUES(?)',
    [req.body.itemName],
    (error,results) => {
      res.redirect('/');
    }
  );
});

app.post('/delete/:id', (req, res) => {
  connection.query(
    'DELETE FROM items WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.redirect('/');
    }
  );
});

app.get('/edit/:id', (req, res) => {

  connection.query(
    'SELECT * FROM items WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.render('edit.ejs',{item: results[0]});
    }
    );
 
});


app.post('/update/:id', (req, res) => {

  connection.query(
    'UPDATE items SET name = ? WHERE id = ?',
    [req.body.itemName,req.params.id],
    (error,results) => {
      res.redirect('/');
    }
    );
    

 
});
app.listen(3000);