const express = require('express');
const app = express();

const usersRoutes = require('./routes/users.routes');
const repairsRoutes = require('./routes/repairs.routes');
const authRouter = require('./routes/auth.routes');
const globalErrorHandler = require('./controllers/error.controller');
const AppError = require('./utils/appErrors');

//1. MIDDLEWARES
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date();
  next();
});

//2. ROUTES

app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/repairs', repairsRoutes);

//ERRORS

app.all('*', (req, res, next) => {
  return next(
    new AppError(
      `Can't find ${req.originalUrl} on this server! 🧨`,
      404
    )
  );
});

app.use(globalErrorHandler);

//3. EXPORTS APP

module.exports = app;
