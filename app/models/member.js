const mongoose = require('mongoose');
const validator = require('validator');

const memberSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, 'Invalid email']
  },
  date: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Member', memberSchema);
