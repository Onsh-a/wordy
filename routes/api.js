import express from 'express'
import bcrypt from 'bcryptjs'
import UserModel from '../models/User.js'
import PairModels from '../models/Pair.js'
export const router = express.Router();

// Signin
router.post('/signin', async (req, res) => {
  // check if the user with such an email already exists
  try {
    const emailExists = await UserModel.findOne({ email: req.body.email });
    const loginExists = await UserModel.findOne({ login: req.body.login });
    if (emailExists || loginExists) return res.status(500).json({
      success: false,
      message: `Пользователь с таким ${emailExists ? 'email' : 'логином'} уже зарегестрирован`
    })

    //hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashPwd = await bcrypt.hash(req.body.pwd, salt);

    // creating new user
    const User = new UserModel({
      name: req.body.name,
      login: req.body.login,
      email: req.body.email,
      password: hashPwd,
    });
    await User.save()
    res.status(200).json({
      success: true,
      message: 'Пользователь успешно создан',
      user: User
    })

  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Во время создание пользователя произошла ошибка',
    })
  }
})

// login
router.post('/login', async (req, res) => {
  // check if the user with such an email already exists
  try {
    const login = req.body.login;
    const user = await UserModel.findOne({ login: login })

    if (!user) {
      res.status(200).json({
        success: false,
        message: 'пользователь c таким логином не найден'
      });
    }

    // comparing the pwd
    const validPwd = await bcrypt.compare(req.body.pwd, user.password);
    if (!validPwd) {
      res.status(200).json({
        success: false,
        message: 'Указан неверный пароль',
      })
    } else {
      res.status(200).json({
        success: true,
        message: 'Вы успешно авторизованы!',
        userId: user._id
      })
    }

  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Во время авторизации произошла ошибка',
      serverMessage: err.message
    })
  }
})

// Getting all
router.get('/', async (req, res) => {
  try {
    const user = req.query.user;
    const pairs = await PairModels[req.query.lang].find({ userId: user });
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

// Creating one
router.post('/', async (req, res) => {
  try {
    let pair = new PairModels[req.body.lang]({
      russian: req.body.russian,
      foreign: req.body.foreign,
      userId: req.body.userId
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
    pair = await PairModels[req.query.lang].findById(req.params.id)
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

