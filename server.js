const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 4000;

// Routes
const routes = require('./routes');

// ------------------------------------------------- MIDDLEWARE ------------------------------------------------- //

// BodyParser Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Serve Public Directory
app.use(express.static(__dirname + '/public'));



// ------------------------------------------------- ENDPOINTS ------------------------------------------------- //

// HTML Routes
app.get('/', (req, res) => {
  res.sendFile('views/index.html', {
    root: __dirname
  });
});

// API Routes


// ----------------------------------------------- START SERVER ----------------------------------------------- //
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
