const bcrypt = require('bcryptjs');

const db = require('../models');

const createUser = (req, res) => {
  // console.log('Create User Route');
  db.User.findOne({ email: req.body.email }, (err, foundUser) => {
    if (err) return res.status(500).json({
      status: 500,
      error: [{ message: 'Something went wrong. Please try again' }],
    });

    if (foundUser) return res.status(400).json({
      status: 400,
      error: [{ message: 'Invalid request. Please try again' }]
    });

    // Number of salt rounds
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return res.status(500).json({
        status: 500,
        error: [{ message: 'Something went wrong. Please try again' }],
      });

      // Bcrypt takes password and salt
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) return res.status(500).json({
          status: 500,
          error: [{ message: 'Something went wrong. Please try again' }],
        });

        const newUser = {
          name: req.body.name,
          email: req.body.email,
          password: hash
        };

        db.User.create(newUser, (err, createdUser) => {
          if (err) return res.status(500).json({
            status: 500,
            error: [{ message: 'Something went wrong. Please try again' }],
          });

          res.status(201).json({
            status: 201,
          });
        });
      });
    });
  });
};


module.exports = {
  createUser,
};
