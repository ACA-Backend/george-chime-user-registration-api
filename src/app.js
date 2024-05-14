import { object, string } from 'joi';

const userSchema = object({
  username: string().alphanum().min(3).max(30).required(),
  email: string().email().required()
});


const users = []; // Array to store user details

app.post('/api/v1/auth/register', (req, res) => {
  const { error, value } = userSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check for uniqueness
  if (users.some(user => user.username === value.username || user.email === value.email)) {
    return res.status(409).send('Username or email already exists');
  }

  users.push(value);
  res.status(201).send('User registered successfully');
});


app.get('/api/v1/auth/users', (req, res) => {
    res.status(200).json(users);
  });
  
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  

  const express = require('express');
const app = express();
app.use(express.json());

// Routes and middleware here

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
