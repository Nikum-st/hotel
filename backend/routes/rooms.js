const mongoose = require('mongoose');
const express = require('express');
const getRooms = require('../controllers/rooms/getRooms');
const getRoom = require('../controllers/rooms/getRoom');
const createBooking = require('../controllers/bookings/createBooking');
const roomMapper = require('../helpers/clientMappers/roomMapper');
const isAuthorizated = require('../middlewares/isAuthorizated');
const isAdmin = require('../middlewares/isAdmin');
const updateRoom = require('../controllers/rooms/updateRoom');
const upload = require('../middlewares/upload');
const updateImg = require('../controllers/rooms/updateImg');

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
	try {
		const { totalPages, rooms } = await getRooms(req.query.page, req.query.limit);

		return res
			.status(200)
			.send({ error: null, data: { totalPages, rooms: rooms.map(roomMapper) } });
	} catch (e) {
		return res.send({ error: e.message, data: null });
	}
});

router.get('/:name', async (req, res) => {
	try {
		const room = await getRoom(req.params.name);
		if (!room) {
			return res
				.status(404)
				.send({ error: 'The selected room does not exist', data: null });
		}

		return res.status(200).send({ error: null, data: roomMapper(room) });
	} catch (e) {
		return res.send({ error: e.message, data: null });
	}
});

router.patch('/:id', isAuthorizated, isAdmin, upload.single('img'), async (req, res) => {
	try {
		const roomId = req.params.id;

		if (!mongoose.Types.ObjectId.isValid(roomId)) {
			return res.status(400).send({ error: 'Invalid room ID', data: null });
		}

		const { img } = await updateImg(req.file, roomId);

		const updatedRoom = await updateRoom({ ...req.body, img }, roomId);

		return res.status(200).send({ error: null, data: roomMapper(updatedRoom) });
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
		return res.send({ error: e.message, data: null });
	}
});

module.exports = router;
