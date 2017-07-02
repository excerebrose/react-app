const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

// Logging Middleware
app.use(morgan('combined'))

app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.get('/api', (req, res) => {
  res.send('App Get Data Here!');
});

app.listen(app.get('port'), () => {
  console.info(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
