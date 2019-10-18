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

  });
};


module.exports = {
  createUser,
};
