const express = require('express')
const router = express.Router()
const Pair = require('../models/pair')

// Getting all
router.get('/', async (req, res) => {
  try {
    const pairs = await Pair.find()
    res.json(pairs);
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One
router.get('/:id', getPair, (req, res) => {
  res.json(res.subscriber)
})

// Creating one
router.post('/', async (req, res) => {
  const pair = new Pair({
    russian: req.body.russian,
    english: req.body.english
  })
  try {
    const newPair = await pair.save()
    res.status(201).json(newPair)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating One
router.patch('/:id', getPair, async (req, res) => {
  if (req.body.name != null) {
    res.subscriber.name = req.body.name
  }
  if (req.body.subscribedToChannel != null) {
    res.subscriber.subscribedToChannel = req.body.subscribedToChannel
  }
  try {
    const updatedSubscriber = await res.subscriber.save()
    res.json(updatedSubscriber)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:id', getPair, async (req, res) => {
  try {
    await res.pair.remove()
    res.json({ message: 'Pair deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getPair(req, res, next) {
  let pair
  try {
    pair = await Pair.findById(req.params.id)
    if (pair == null) {
      return res.status(404).json({ message: 'Cannot find word pair' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.pair = pair
  next()
}

module.exports = router