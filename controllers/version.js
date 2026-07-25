import { genericError } from '../helpers/index.js'
import Verse from '../models/verse.js'
import { saveRequest } from './request.js'

export const getVersions = async (req, res) => {
  try {
    await saveRequest(req)
    const versions = await Verse.aggregate([
      {
        $group: {
          _id: '$version',
          count: { $sum: 1 }
        }
      },
      {
        $sort: {
          _id: 1
        }
      }
    ])

    res.json(versions.map(({ _id, count }) => ({
      version: _id,
      verses: count
    })))
  } catch (err) {
    /* istanbul ignore next */
    genericError(res, err)
  }
}
