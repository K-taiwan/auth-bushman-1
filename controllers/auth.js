const bcrypt = require('bcryptjs');

// Database
const db = require('../models');


// GET Signup Form - New User
// const newUser = (req, res) => {
//   res.sendFile('views/auth/signup.html', {
//     root: `${__dirname}/../`,
//   });
// };


// Post Signup - Create User
const createUser = (req,res) => {
  const errors = [];

  if (!req.body.name) {
    errors.push({field: 'name', message: 'Please enter your name'});
  }

  if (!req.body.email) {
    errors.push({field: 'email', message: 'Please enter your email'});
  }

  if (!req.body.password) {
    errors.push({field: 'password', message: 'Please enter your password'});
  }

  if (req.body.password !== req.body.password2) {
    errors.push({field: 'password2', message: 'Your passwords do not match'});
  }

  if (errors.length) {
    return res.json({
      status: 400,
      errors
    });
  }

  db.User.findOne({ email: req.body.email }, (err, foundUser) => {
    if (err) return res.status(500).json({
      status: 500,
      errors: [{message: 'Something went wrong. Please try again'}]
    });

    if (foundUser) return res.status(400).json({
      status: 400,
      errors: [{message: 'Email address has already been registered. Please try again'}]
    });


    // Generate Salt (Asynchronous callback version)
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return res.status(500).json({
      status: 500,
      errors: [{message: 'Something went wrong. Please try again'}]
    });
    // if (err) throw err;

    // Hash User Password
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      if (err) return res.status(500).json({
        status: 500,
        errors: [{message: 'Something went wrong. Please try again'}]
      });
      
      // if (err) throw err;

      const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: hash,
      }

      db.User.create(newUser, (err, savedUser) => {
        if (err) return res.status(500).json({
          status: 500,
          errors: [{message: 'Something went wrong. Please try again'}]
        });

        res.json({
          status: 201,
          data: savedUser
        });
      });
    });
  });
  });

};


// // GET Login Form - New Session
// const newSession = (req, res) => {
//   res.sendFile('views/auth/login.html', {
//     root: `${__dirname}/../`,
//   });
// };



// POST Login - Create Session
const createSession = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      status: 400,
      errors: [{message: 'Please enter your email and password'}],
    });
  }

  db.User.findOne({email: req.body.email}, (err, foundUser) => {
    if (err) return res.status(500).json({
      status: 500,
      errors: [{message: 'Something went wrong. Please try again'}],
    });

    if (!foundUser) {
      return res.status(400).json({
        status: 400,
        errors: [{message: 'Username or password is incorrect'}],
      });
    }

    bcrypt.compare(req.body.password, foundUser.password, (err, isMatch) => {
      if (err) return res.status(500).json({
        status: 500,
        errors: [{message: 'Something went wrong. Please try again'}],
      });

      if (isMatch) {
        req.session.loggedIn = true;
        // req.session.currentUser = {id: foundUser._id, name: foundUser.name, email: foundUser.email};
        req.session.currentUser = foundUser._id;
        return res.status(200).json({
          status: 200,
          data: {id: foundUser._id},
        });
      } else {
        return res.json({
          status: 400,
          errors: [{message: 'Username or password is incorrect'}],
        });
      }

    });
  });

};



// DELETE Logout - Destroy Session
const deleteSession = (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({
      status: 500,
      errors: [{message: 'Something went wrong. Please try again'}]});

    res.status(200).json({
      status: 200,
      message: 'Success',
    });
  });
};


module.exports = {
  createUser,
  createSession,
  deleteSession,
}
