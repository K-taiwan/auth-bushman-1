const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

// Current Path = /api/v1

// ------------------------------------------ AUTH -------------------------------------------- //

router.post('/signup', ctrl.auth.createUser);
router.post('/login', ctrl.auth.createSession);
router.delete('/logout', ctrl.auth.deleteSession);


// ----------------------------------------- PROFILE ------------------------------------------- //

router.get('/profiles/:userId', ctrl.profiles.show);


module.exports = router;
