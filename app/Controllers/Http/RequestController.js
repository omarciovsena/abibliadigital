'use strict'

const Database = use('Database')
const Request = use('App/Models/Request')
const moment = require('moment')
const { newRequest } = use('App/utils')

const getPeriod = period => {
  switch (period) {
    case 'month':
      return moment().subtract(30, 'days')
    case 'week':
      return moment().subtract(7, 'days')
    default:
      return moment().subtract(1, 'days')
  }
}

class RequestController {
  /**
   * @api {get} api/requests/:period? Get Requests
   * @apiVersion 0.2.0
   * @apiName show
   * @apiGroup Requests
   *
   *
   * @apiParam {String} period [month, week, day]
   *
   * @apiSuccess {String} url Requisition url
   * @apiSuccess {String} data Requisition date
   *
   * @apiExample Example usage:
   * curl -i https://bibleapi.co/api/requests/month
   *
   * @apiSuccessExample {json} Success-Response:
   *    HTTP/1.1 200 OK
   *    [{
   *      "url": "/api/books/gn",
   *      "date": "2018-12-08T22:16:52.000Z"
   *    }]
   *
   * @apiError TooManyRequests When performing more than 3 requests at the same endpoint in an interval less than 5 minutes
   *
   * @apiErrorExample {text} Error-Response:
   *    HTTP/1.1 429 Too Many Requests
   *
   *
   */

  async show({ request, params }) {
    newRequest(request.url())
    const { period } = params
    const date = getPeriod(period)
    const requests = date
      ? await Request.query().where('created_at', '>', date)
      : await Request.query()
    return requests.map(request => ({
      url: request.url,
      date: request.created_at
    }))
  }

  /**
   * @api {get} api/requests/count/:period? Get Count Requests
   * @apiVersion 0.2.0
   * @apiName count
   * @apiGroup Requests
   *
   *
   * @apiParam {String} period [month, week, day]
   *
   * @apiSuccess {String} url Requisition url
   * @apiSuccess {String} count Number of requisitions in the period
   *
   * @apiExample Example usage:
   * curl -i https://bibleapi.co/api/requests/count/month
   *
   * @apiSuccessExample {json} Success-Response:
   *    HTTP/1.1 200 OK
   *    [{
   *      "url": "/api/books/gn",
   *      "count": "3",
   *    }]
   *
   * @apiError TooManyRequests When performing more than 3 requests at the same endpoint in an interval less than 5 minutes
   *
   * @apiErrorExample {text} Error-Response:
   *    HTTP/1.1 429 Too Many Requests
   *
   *
   */

  async count({ request, params }) {
    newRequest(request.url())
    const { period } = params
    const date = getPeriod(period)
    const requests = date
      ? await Database.count()
          .select('url')
          .from('requests')
          .where('created_at', '>', date)
          .groupBy('url')
          .orderBy('count', 'desc')
      : await Database.count()
          .select('url')
          .from('requests')
          .groupBy('url')
          .orderBy('count', 'desc')
    return requests
  }
}

module.exports = RequestController
