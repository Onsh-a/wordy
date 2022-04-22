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
  }
})

const eng = mongoose.model('eng', englishPairSchema);
const esp = mongoose.model('sp', spanishPairSchema)

export default {
  eng,
  esp
}
