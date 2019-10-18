const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

// GET Home
router.get('/', (req, res) => {
  res.sendFile('views/index.html', {
    root: `${__dirname}/../`
  });
});

router.get('/signup', (req, res) => {
  res.sendFile('views/auth/signup.html', {
    root: `${__dirname}/../`
  });
});

module.exports = router;
