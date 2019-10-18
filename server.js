const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 4000;

// Routes
const routes = require('./routes');

// Database
// const db = require('./models');


// ------------------------------------------------- MIDDLEWARE ------------------------------------------------- //

// BodyParser Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Serve Public Directory
app.use(express.static(__dirname + '/public'));

// Custom Logger Middleware
app.use((req, res, next) => {
  const url = req.url;
  const method = req.method;
  const requestedAt = new Date().toLocaleString();
  console.table({ url, method, requestedAt });
  next();
});

// User Session
app.use(session({
  secret: 'Shhhh, this is a secret...!',
  resave: false,
  saveUninitialized: false // Only save the session if a property has been added to req.session
}));


// ------------------------------------------------- ENDPOINTS ------------------------------------------------- //

// HTML Routes
app.use('/', routes.views);

// API Routes
app.use('/api/v1', routes.api);

// ----------------------------------------------- START SERVER ----------------------------------------------- //
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
