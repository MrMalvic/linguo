const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const MongoClient = require('mongodb').MongoClient;


const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('™️ Malumbo Mutale');
});

app.get('/api/users', (req, res) => {
  res.send('here is where the users are');
});

app.post('/api/users/signup', (req, res) => {
  const { name, email, password } = req.body;
  // Add your signup logic here
  const user = { name, email, password };
  const data = JSON.stringify(user);
  const path = './api/users/' + email + '.json';

  fs.writeFile(path, data, (error) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create user' });
    } else {
      console.log('User created successfully');
      res.status(200).json({ message: 'User created successfully' });
    }
  });
});

app.post('/api/users/login', (req, res) => {
  const { email, password } = req.body;
  const path = './api/users/' + email + '.json';

  fs.readFile(path, 'utf8', (error, data) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to read user data' });
    } else {
      const user = JSON.parse(data);
      if (user.password === password) {
        console.log('User logged in successfully');
        res.status(200).json({ message: 'User logged in successfully' });
      } else {
        console.error('Incorrect password');
        res.status(401).json({ error: 'Incorrect password' });
      }
    }
  });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
