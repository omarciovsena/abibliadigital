export const genericError = (res, err) => {
  res.status(500).json({
    msg: 'Oops! An unexpected error has occurred, create an [issue](https://github.com/marciovsena/bibleapi/issues/new) with the information of this request.',
    err
  })
}
