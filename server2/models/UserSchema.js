const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  discordId: {
    type: String,
    required: true,
    unique: true
  },
  avatar: {
    type: String,
    default: null
  },
  discordName: {
    type: String,
    required: true
  }
  
})

module.exports = mongoose.model('UserSchema', schema);