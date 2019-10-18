// Database
const db = require('../models');

// GET Profile - Show User Profile
const show = (req, res) => {
  console.log('hit')
  if (!req.session.currentUser) {
    return res.status(401).json({
      status: 401,
      errors: [{ message: 'Unauthorized. Please login and try again' }],
    });
  }

  db.User.findById(req.params.userId, (err, foundUser) => {
    if (err) return res.status(500).json({
      status: 500,
      errors: [{message: 'Something went wrong. Please try again'}]
    });

    res.status(200).json({
      status: 200,
      data: foundUser,
    });
  })
};


module.exports = {
  show,
};
