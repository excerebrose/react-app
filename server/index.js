const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const expressSession = require('express-session')
const cookieParser = require('cookie-parser')
const passport = require('passport');

const db = require('./db');
const auth = require('./auth');
const routes = require('./routes');

const app = express();

// Logging Middleware
app.use(morgan('combined'));

// Use cookie parser to store data
app.use(cookieParser());
app.use(expressSession({
  secret: 'verysecrettoken',
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 3001);

// Authentication API Setup
app.use(passport.initialize());
app.use(passport.session());

auth(passport);
routes(app, passport);

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.listen(app.get('port'), () => {
  console.info(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
