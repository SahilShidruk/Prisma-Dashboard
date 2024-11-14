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
  token_type: {
    type: String,
    required: true
  },
  expires_in: {
    type: Number,
    required: true
  },
  refresh_token: {
    type: String,
    required: true
  },
  scope: {
    type: String,
    required: false
  }
})

module.exports = mongoose.model('AuthSchema', schema);