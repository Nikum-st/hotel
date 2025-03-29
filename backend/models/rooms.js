const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({}, { strict: false });
module.exports = mongoose.model('rooms', roomSchema);
