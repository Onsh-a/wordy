import mongoose from 'mongoose';

const englishPairSchema = new mongoose.Schema({
  russian: {
    type: Object,
    required: true
  },
  foreign: {
    type: Array,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  userId: {
    type: String,
    required: true,
  }
})

const spanishPairSchema = new mongoose.Schema({
  russian: {
    type: Object,
    required: true
  },
  foreign: {
    type: Array,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  userId: {
    type: String,
    required: true,
  }
})

const eng = mongoose.model('eng', englishPairSchema, 'EnglishPairs');
const esp = mongoose.model('sp', spanishPairSchema, 'SpanishPairs')

export default {
  eng,
  esp
}
