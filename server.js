require('dotenv').config();
const app = require('./app');
const { db } = require('./database/config');

//AUTENTICACION DE LA BD
db.authenticate()
  .then(() => console.log('DB is connected'))
  .catch((err) => console.log(err));
//SINCRONIZACION DE LA BD
db.sync()
  .then(() => console.log('DB is synced'))
  .catch((err) => console.log(err));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
