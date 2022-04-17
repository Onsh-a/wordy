const mongoose = require('mongoose')

const pairSchema = new mongoose.Schema({
  russian: {
    type: Object,
    required: true
  },
  english: {
    type: Array,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
})

module.exports = mongoose.model('newPair', pairSchema)
