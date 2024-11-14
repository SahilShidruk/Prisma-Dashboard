const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  discordId: {
    type: String,
    required: true,
    unique: true
  },
  access_token: {
    type: String,
    required: true
  },
  refresh_token: {
    type: String,
    required: true
  },
})

module.exports = mongoose.model('AuthSchema', schema);