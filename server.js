'use strict';

const express = require('express');
const cors = require('cors');
const pg = require('pg');

const app = express();
const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;

const cliet = new pg.Client(process.env.DATABASE_URL);
client.connect();
app.use(cors());

app.get('/',(request, response) => response.send('Testing 1, 2, 3'));

app.listen(PORT, ()=> console.log(`listening on PORT:${PORT}`));

// PORT=3000
// CLIENT_URL = http://localhost:8000
// DATABASE_URL=postgres://localhost:5432/booklist

