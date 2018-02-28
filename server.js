'use strict';

const express = require('express');
const cors = require('cors');
const pg = require('pg');
//todo - finish body parser function (at 4:24 in video)
const bodyParser = require ()

const app = express();
const PORT = process.env.PORT || 4000;
const CLIENT_URL = process.env.CLIENT_URL;

const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
app.use(cors());

app.get('/api/v1/books',(request, response) => {
  client.query(`SELECT book_id, title,author, image_url, isbn, FROM books;`).then(results => response.send(results.rows)).catch(console.error);
});

app.get('/*',(request, response) =>
  response.redirect(CLIENT_URL)
);

app.post('/books/add', bodyParser, (request,response)=> {
  //todo: inerst the new task into the database, pass the results back to the frontend, and catch any errors

  //this is called destructuring (instead of example line of 5 the long way)
  let {title, author, isbn, image_url, description} = req.body;
  console.log(title);
  //let title = req.body.title; etc. is alternate method without destructuring
  client.query(`
  INSERT INTO books(title, author, isbn, image_url,descriptions) VALUES ($1, $2, $3, $4,$5);`,[title,author, isbn, image_url, description])
    .then(() => response.sendStatus(201))
    .catch(console.error);
});

app.listen(PORT, ()=> console.log(`listening on PORT:${PORT}`));


// PORT=3000
// CLIENT_URL = http://localhost:3000
// DATABASE_URL= postgres://monlhvsyldctvl:348229b16f7b352c54f13c2411a9df98c9d2b16f8f8cc9a9720e1076a64fa3de@ec2-174-129-26-203.compute-1.amazonaws.com:5432/df40pmm7k2pt0q

