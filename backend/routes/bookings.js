const express = require('express');
const getUserBookings = require('../controllers/bookings/getUserBookings');
const userBookingMapper = require('../helpers/clientMappers/userBookingMapper');
const deleteBooking = require('../controllers/bookings/deleteBooking');
const isAuthorizated = require('../middlewares/isAuthorizated');

const router = express.Router({ mergeParams: true });

router.get('/user', isAuthorizated, async (req, res) => {
	try {
		const userId = req.user.id;

		const bookings = await getUserBookings(userId);

		return res
			.status(200)
			.send({ error: null, data: bookings.map(userBookingMapper) });
	} catch (e) {
		return res.status(500).send({ error: e.message, data: null });
	}
});

router.delete('/:id', isAuthorizated, async (req, res) => {
	try {
		const roleUser = req.user.role;
		const bookingId = req.params.id;

		await deleteBooking(bookingId, roleUser);

		return res.status(200).send({ error: null, data: true });
	} catch (e) {
		return res.status(500).send({ error: e.message, data: null });
	}
});

module.exports = router;
