import express from 'express'
import schemas from '../models/pair.js'
export const router = express.Router();

// Getting all
router.get('/', async (req, res) => {
  try {
    let pairs = await schemas[req.query.lang].find();
    res.json({
      success: true,
      data: pairs
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Во время запроса произошла ошибка'
    })
  }
})

// Getting One
router.get('/:id', getPair, (req, res) => {
  res.json(res.subscriber)
})

// Creating one
router.post('/', async (req, res) => {
  try {
    let pair = new schemas[req.body.lang]({
      russian: req.body.russian,
      foreign: req.body.foreign
    })
    await pair.save()
    res.status(200).json({
      success: true,
      message: 'Запись успешно добавлена',
      newPair: pair,
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'При добавлении произошла ошибка'
    })
  }
})

// Updating One
router.patch('/:id', getPair, async (req, res) => {
  if (req.body.russian != null) {
    res.pair.russian = req.body.russian
  }
  if (req.body.foreign != null) {
    res.pair.foreign = req.body.foreign
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
      message: "Failed to delete the pair"
    })
  }
})

async function getPair(req, res, next) {
  let pair
  try {
    pair = await schemas[req.query.lang].findById(req.params.id)
    if (pair == null) {
      return res.status(404).json({
        success: false,
        message: 'Пара не найдена'
      })
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Что-то сломалось'
    })
  }

  res.pair = pair
  next()
}

