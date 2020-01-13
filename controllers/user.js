import md5 from 'md5'

import { notFound, genericError } from '../helpers/'
import User from '../models/user'
import { generateToken } from './session'

export const updateLastLogin = async (_id) => {
  User.findOne({ _id }, (err, user) => {
    if (err) throw err

    if (user) {
      user.lastLogin = new Date()
      user.save()
    }
  })
}

export const getUser = async (req, res) => {
  try {
    const { email } = req.params
    const { token } = req.user
    const user = await User.findOne({ email, token })
    if (!user) {
      return notFound(res, 'User')
    }
    await updateLastLogin(user._id)
    res.json({
      name: user.name,
      email: user.email,
      token: user.token,
      notifications: user.notifications,
      lastLogin: user.lastLogin
    })
  } catch (err) {
    genericError(res, err)
  }
}

export const createUser = async (req, res) => {
  try {
    const { name, email, password, notifications } = req.body
    const exists = await User.findOne({ email })

    if (exists) {
      return res.status(400).json({
        msg: 'User already exists'
      })
    }

    if (name && email && password && notifications !== undefined) {
      const newUser = await User.create({
        name,
        email,
        token: generateToken(email),
        password: md5(password),
        notifications,
        lastLogin: new Date()
      })

      return res.json({
        name: newUser.name,
        email: newUser.email,
        notifications: newUser.notifications,
        token: newUser.token
      })
    }

    return res.status(400).json({
      msg: '{name}(String), {email}(String), {notifications}(Boolean) and {password}(String) are required'
    })
  } catch (err) {
    genericError(res, err)
  }
}

export const removeUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const { token } = req.user
    const user = await User.deleteOne({ email, password: md5(password), token })
    if (user.deletedCount === 0) {
      return notFound(res, 'User')
    }
    res.json({
      msg: 'User successfully removed'
    })
  } catch (err) {
    genericError(res, err)
  }
}
