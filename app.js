const express = require('express');
const app = express();

const usersRoutes = require('./routes/users.routes');
const repairsRoutes = require('./routes/repairs.routes');

//1. MIDDLEWARES
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date();
  next();
});

//2. ROUTES

app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/repairs', repairsRoutes);

//3. EXPORTS APP

module.exports = app;
