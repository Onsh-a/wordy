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
  if (req.body.russian != null) {
    res.pair.russian = req.body.russian
  }
  if (req.body.english != null) {
    res.pair.english = req.body.english
  }
  try {
    const updatedPair = await res.pair.save()
    res.json(updatedPair)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:id', getPair, async (req, res) => {
  try {
    await res.pair.remove()
    res.json({
      success: true,
      message: 'Element successfully deleted',
      id: res.pair._id
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
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
