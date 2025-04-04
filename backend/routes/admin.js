const express = require('express');
const isAuthorizated = require('../middlewares/isAuthorizated');
const isAdmin = require('../middlewares/isAdmin');
const archiveBookingDelete = require('../controllers/archive/archiveBookingDelete');
const archiveDelete = require('../controllers/archive/archiveDelete');
const bookingMapper = require('../helpers/clientMappers/bookingMapper');
const getAllBookings = require('../controllers/bookings/getAllBookings');
const getArchive = require('../controllers/archive/getArchive');

const router = express.Router({ mergeParams: true });

router.get('/bookings', isAuthorizated, isAdmin, async (req, res) => {
	try {
		const bookings = await getAllBookings();
		const mappedBookings = await Promise.all(bookings.map((b) => bookingMapper(b)));

		res.status(200).send({ error: null, data: mappedBookings });
	} catch (e) {
		res.status(500).send({ error: e.message, data: null });
	}
});

router.get('/archive', isAuthorizated, isAdmin, async (req, res) => {
	try {
		const archive = await getArchive();

		res.status(200).send({ error: null, data: archive });
	} catch (e) {
		res.status(500).send({ error: e.message, data: null });
	}
});

router.delete('/archive/:id', isAuthorizated, isAdmin, async (req, res) => {
	try {
		const bookingId = req.params.id;

		await archiveBookingDelete(bookingId);

		res.status(200).send({ error: null, data: true });
	} catch (e) {
		res.status(500).send({ error: e.message, data: null });
	}
});
router.delete('/archive', isAuthorizated, isAdmin, async (req, res) => {
	try {
		await archiveDelete();

		res.status(200).send({ error: null, data: true });
	} catch (e) {
		res.status(500).send({ error: e.message, data: null });
	}
});

module.exports = router;
