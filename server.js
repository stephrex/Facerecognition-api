const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : 'stephenireoloyede1',
    database : 'facerecognition'
  }
});


const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/',  (req, res) => {res.send('wassup')})
app.post('/register', register.handleRegister(db, bcrypt))
app.post('/signin', signin.handleSignin ( db, bcrypt))
app.get('/profile/:id', profile.handleProfile (db))
app.put('/image', image.handleImage (db))

app.listen( process.env.PORT || 3000, () => {
	console.log(`app is running smoothly on port ${process.env.PORT}`);
})



