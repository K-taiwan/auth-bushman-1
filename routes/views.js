const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');


// GET Home 
router.get('/', (req, res) => {
  res.sendFile('views/index.html', {
    root: `${__dirname}/../`
  });
});


// ---------------------------------------------- AUTH ----------------------------------------------- //

// GET Signup - Create User
router.get('/signup', (req, res) => {
  res.sendFile('views/auth/signup.html', {
    root: `${__dirname}/../`,
  });
});


// GET Login - New Session
router.get('/login', (req, res) => {
  res.sendFile('views/auth/login.html', {
    root: `${__dirname}/../`,
  });
});


// DELETE Logout - Destroy Session
router.delete('/logout', ctrl.auth.deleteSession);


// ---------------------------------------------- PROFILE ----------------------------------------------- //

// GET Profile - SHow User Profile
router.get('/profile/:userId', (req, res) => {
  if (!req.session.currentUser) {
    // res.status(401).json({
    //   status: 401,
    //   errors: [{ message: 'Unauthorized. Please login and try again' }]
    // });
    res.redirect('/login');
  }

  res.sendFile('views/profile/show.html', {
    root: `${__dirname}/../`,
  });
});



module.exports = router;
