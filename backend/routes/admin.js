const express = require('express');
const isAuthorizated = require('../middlewares/isAuthorizated');
const isAdmin = require('../middlewares/isAdmin');
const archiveBookingDelete = require('../controllers/archive/archiveBookingDelete');
const archiveDelete = require('../controllers/archive/archiveDelete');
const getUsers = require('../controllers/user/getUsers');
const deleteUser = require('../controllers/user/deleteUser');
const bookingMapper = require('../helpers/clientMappers/bookingMapper');
const getAllBookings = require('../controllers/bookings/getAllBookings');
const getArchive = require('../controllers/archive/getArchive');
const userMapper = require('../helpers/clientMappers/userMapper');
const archiveMapper = require('../helpers/clientMappers/archiveMapper');

const router = express.Router({ mergeParams: true });

router.get('/bookings', isAuthorizated, isAdmin, async (req, res) => {
	try {
		const bookings = await getAllBookings();

		return res.status(200).send({ error: null, data: bookings.map(bookingMapper) });
	} catch (e) {
		return res.status(500).send({ error: e.message, data: null });
	}
});

router.get('/users', isAuthorizated, isAdmin, async (req, res) => {
	try {
		const users = await getUsers();
		const mappedBookings = users
			.filter((b) => b.role !== 'admin')
			.map((b) => userMapper(b));

		return res.status(200).send({ error: null, data: mappedBookings });
	} catch (e) {
		return res.status(500).send({ error: e.message, data: null });
	}
});

router.delete('/users/:id', isAuthorizated, isAdmin, async (req, res) => {
	try {
		await deleteUser(req.params.id);

		return res.status(200).send({ error: null, data: true });
	} catch (e) {
		return res.status(500).send({ error: e.message, data: null });
	}
});

router.get('/archive', isAuthorizated, isAdmin, async (req, res) => {
	try {
		const archive = await getArchive();
		console.log(archive);

		return res.status(200).send({ error: null, data: archive.map(archiveMapper) });
	} catch (e) {
		return res.status(500).send({ error: e.message, data: null });
	}
});

router.delete('/archive/:id', isAuthorizated, isAdmin, async (req, res) => {
	try {
		const bookingId = req.params.id;

		await archiveBookingDelete(bookingId);

		return res.status(200).send({ error: null, data: true });
	} catch (e) {
		return res.status(500).send({ error: e.message, data: null });
	}
});
router.delete('/archive', isAuthorizated, isAdmin, async (req, res) => {
	try {
		await archiveDelete();

		return res.status(200).send({ error: null, data: true });
	} catch (e) {
		return res.status(500).send({ error: e.message, data: null });
	}
});

module.exports = router;
