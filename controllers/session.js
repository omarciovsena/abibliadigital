import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

import { genericError, notAuthorized } from '../helpers/index.js'
import User from '../models/user.js'

dotenv.config()

export const getToken = (req) => {
  const token = req.headers.authorization
  return token ? token.slice(7, token.length) : null
}

export const setRequiredToken = async (req, res, next) => {
  req.requiredToken = true
  next()
}

export const validToken = async (req, res, next) => {
  try {
    const token = getToken(req)
    if (token) {
      const user = await User.findOne({ token })
      if (!user) {
        return notAuthorized(res)
      }
      req.user = user
      return next()
    }

    if (!req.requiredToken) return next()

    notAuthorized(res)
  } catch (err) {
    /* istanbul ignore next */
    genericError(res, err)
  }
}

export const generateToken = (str) => {
  return jwt.sign({ str }, process.env.SECRET_KEY)
}
