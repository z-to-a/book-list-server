'use strict';


const express = require('express');
const cors = require('cors');
const pg = require('pg');
const bodyParser = require('body-parser').urlencoded({extended:true});

const app = express();
const PORT = process.env.PORT || 3000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:8080';
const DATABASE_URL = 'postgres://localhost:5432/books_app';

const client = new pg.Client(DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));
app.use(cors());

app.get('/api/v1/books',(request, response) => {
  console.log('server get route triggered')
  client.query(`SELECT title, author, isbn, image_url, book_id FROM books;`).then(results => {
    // console.log(results,'these are the results');
    response.send(results.rows)
  }).catch(console.error);
});
app.get('/books/:id', (request, response) => {
  client.query(`SELECT * FROM books WHERE id=book_id;`)
    .then(results => {
      console.log(results,'this is a book');
      response.send(results.rows[0])})
    .catch(console.error);
});


app.post('/api/v1/books', bodyParser, (request,response)=> {
  //This new task inserts a new row into the database, passes the results back to the frontend and catches any errors
  //this way of writing the code is called destructuring
  let {title, author, isbn, image_url, description} = request.body;
  console.log(title);
  client.query(`
  INSERT INTO books(title, author, isbn, image_url,descriptions) VALUES ($1, $2, $3, $4,$5);`,[title,author, isbn, image_url, description])
    .then(() => response.sendStatus(201))
  console.log(response.sendStatus(201))
    .catch(console.error);
});

app.get('*',(request, response) => response.redirect(CLIENT_URL)
);
app.listen(PORT, ()=> console.log(`listening on PORT:${PORT}`));

// PORT=3000
// DATABASE_URL= postgres://monlhvsyldctvl:348229b16f7b352c54f13c2411a9df98c9d2b16f8f8cc9a9720e1076a64fa3de@ec2-174-129-26-203.compute-1.amazonaws.com:5432/df40pmm7k2pt0q

