export const genericError = (res, err) => {
  console.error(err)
  res.status(500).json({
    msg: 'Oops! An unexpected error has occurred, create an [issue](https://github.com/marciovsena/bibleapi/issues/new) with the information of this request.',
    err
  })
}

export const notFound = (res, type) => {
  res.status(404).json({
    msg: `${type} not found`
  })
}

export const notAuthorized = (res) => {
  res.status(403).json({
    msg: 'Not authorized token'
  })
}
