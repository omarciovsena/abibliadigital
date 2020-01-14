import md5 from 'md5'
import moment from 'moment'

import { saveRequest } from '../controllers/request'
import { notFound, genericError } from '../helpers/'
import Request from '../models/request'
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
    await saveRequest(req)
    const { email } = req.params
    const { token } = req.user
    const user = await User.findOne({ email, token })
    if (!user) {
      return notFound(res, 'User')
    }
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

export const updateToken = async (req, res) => {
  try {
    const { email, password } = req.body
    User.findOne({ email, password: md5(password) }, async (err, user) => {
      if (err) throw err

      req.user = {
        _id: user ? user._id : null
      }
      await saveRequest(req)

      if (user) {
        user.token = generateToken(`${moment()}.${user._id}`)
        user.lastLogin = new Date()
        await user.save()
        res.json({
          name: user.name,
          email: user.email,
          token: user.token
        })
      } else {
        return notFound(res, 'User')
      }
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
      await saveRequest(req)
      return res.status(400).json({
        msg: 'User already exists'
      })
    }

    if (name && email && password && notifications !== undefined) {
      const newUser = await User.create({
        name,
        email,
        token: generateToken(`${moment()}.${email}`),
        password: md5(password),
        notifications,
        lastLogin: new Date()
      })

      req.user = {
        _id: newUser._id
      }
      await saveRequest(req)

      return res.json({
        name: newUser.name,
        email: newUser.email,
        notifications: newUser.notifications,
        token: newUser.token
      })
    }
    await saveRequest(req)
    return res.status(400).json({
      msg: '{name}(String), {email}(String), {notifications}(Boolean) and {password}(String) are required'
    })
  } catch (err) {
    genericError(res, err)
  }
}

export const removeUser = async (req, res) => {
  try {
    await saveRequest(req)
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

export const getUserStats = async (req, res) => {
  try {
    await saveRequest(req)
    const requestsPerMonth = await Request.aggregate([
      {
        $match: {
          user: req.user._id.toString()
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      }
    ])

    res.json({
      lastLogin: req.user.lastLogin,
      requestsPerMonth: requestsPerMonth.map(request => ({
        range: `${request._id.month}/${request._id.year}`,
        total: request.count
      }))
    })
  } catch (err) {
    genericError(res, err)
  }
}
