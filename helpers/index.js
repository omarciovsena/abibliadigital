export const genericError = (res, err) => {
  return res.status(500).json({
    msg: 'Oops! An unexpected error has occurred, create an [issue](https://github.com/marciovsena/bibleapi/issues/new) with the information of this request.',
    err
  })
}

export const notFound = (res, type) => {
  return res.status(404).json({
    msg: `${type} not found`
  })
}

export const notAuthorized = (res) => {
  return res.status(403).json({
    msg: 'Not authorized token'
  })
}
