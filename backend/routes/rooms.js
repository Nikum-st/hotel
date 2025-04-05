const mongoose = require('mongoose');
const express = require('express');
const getRooms = require('../controllers/rooms/getRooms');
const createBooking = require('../controllers/bookings/createBooking');
const roomMapper = require('../helpers/clientMappers/roomMapper');
const isAuthorizated = require('../middlewares/isAuthorizated');

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
	try {
		const rooms = (await getRooms()).map((r) => roomMapper(r));

		res.status(200).send({ error: null, data: rooms });
	} catch (e) {
		res.status(500).send({ error: e.message, data: null });
	}
});

router.post('/:id/booking', isAuthorizated, async (req, res) => {
	try {
		const roomId = req.params.id;
		const userId = req.user.id;

		if (!mongoose.Types.ObjectId.isValid(roomId)) {
			return res.status(400).send({ error: 'Invalid room ID', data: null });
		}

		const booking = await createBooking(req.body, roomId, userId);

		res.status(200).send({ error: null, data: booking });
	} catch (e) {
		res.status(500).send({ error: e.message, data: null });
	}
});

module.exports = router;
