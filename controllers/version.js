import staticList from '../data/versions.json'
import { genericError } from '../helpers/'
import Verse from '../models/verse'
import { saveRequest } from './request'

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

    res.json(versions.map(({ _id, count }) => {
      const details = staticList[_id] || { version: _id }
      return {
        ...details,
        verses: count
      }
    }))
  } catch (err) {
    /* istanbul ignore next */
    genericError(res, err)
  }
}
