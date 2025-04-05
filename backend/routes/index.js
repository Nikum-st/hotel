const express = require('express');

const router = express.Router({ mergeParams: true });

router.use('/', require('./user'));
router.use('/rooms', require('./rooms'));
router.use('/bookings', require('./bookings'));
router.use('/admin', require('./admin'));

module.exports = router;
