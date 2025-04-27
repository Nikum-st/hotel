const mongoose = require('mongoose');
const express = require('express');
const getRooms = require('../controllers/rooms/getRooms');
const createBooking = require('../controllers/bookings/createBooking');
const roomMapper = require('../helpers/clientMappers/roomMapper');
const isAuthorizated = require('../middlewares/isAuthorizated');

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
	try {
		const { totalRooms, rooms } = await getRooms(req.query.page, req.query.limit);

		return res
			.status(200)
			.send({ error: null, data: { totalRooms, rooms: rooms.map(roomMapper) } });
	} catch (e) {
		return res.send({ error: e.message, data: null });
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

		return res.status(200).send({ error: null, data: booking });
	} catch (e) {
		if (e.code === 11000) {
			return res.send({
				error: 'Check in or Check out already exists in the bookings',
				data: null,
			});
		}
		return res.send({ error: e.message, data: null });
	}
});

module.exports = router;
