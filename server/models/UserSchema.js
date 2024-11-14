const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  discordId: {
    type: String,
    required: true,
    unique: true
  },
  
})

module.exports = mongoose.model('UserSchema', schema);