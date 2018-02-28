'use strict';

const express = require('express');
const cors = require('cors');
const pg = require('pg');
const bodyParser = require('body-parser').urlencoded({extended:true});

const app = express();
const PORT = process.env.PORT || 3000;
const CLIENT_URL = process.env.CLIENT_URL;

const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));
app.use(cors());

// NOT SURE IF WE NEED THIS?
// app.use(express.static('/index'));


app.get('/api/v1/books',(request, response) => {
  client.query(`SELECT book_id, title,author, image_url, isbn FROM books;`).then(results => response.send(results.rows)).catch(console.error);
});

app.get('/*',(request, response) =>
  response.redirect(CLIENT_URL)
);

app.post('/books/add', bodyParser, (request,response)=> {
  //This new task inserts a new row into the database, passes the results back to the frontend and catches any errors

  //this way of writing the code is called destructuring (
  let {title, author, isbn, image_url, description} = req.body;
  console.log(title);

  client.query(`
  INSERT INTO books(title, author, isbn, image_url,descriptions) VALUES ($1, $2, $3, $4,$5);`,[title,author, isbn, image_url, description])
    .then(() => response.sendStatus(201))
    .catch(console.error);
});

app.listen(PORT, ()=> console.log(`listening on PORT:${PORT}`));


// PORT=3000
// CLIENT_URL = http://localhost:3000
// DATABASE_URL= postgres://monlhvsyldctvl:348229b16f7b352c54f13c2411a9df98c9d2b16f8f8cc9a9720e1076a64fa3de@ec2-174-129-26-203.compute-1.amazonaws.com:5432/df40pmm7k2pt0q

