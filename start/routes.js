'use strict'

const Route = use('Route')


Route.get('/:lang', ({ view, params, antl }) => {
  antl.switchLocale(params.lang || 'pt')
  return view.render('index')
})

Route.get('/', ({ view }) => {
  return view.render('index')
})

Route.post('api/users', 'UserController.create')
Route.post('api/sessions', 'SessionController.create')

Route.get('api/books/', 'SearchController.getBooks').middleware(
  'throttle:3:300'
)

Route.get('api/books/:book', 'SearchController.getBook').middleware(
  'throttle:3:300'
)

Route.get(
  'api/verses/:version/:book/:chapter',
  'SearchController.getChapter'
).middleware('throttle:3:300')

Route.get(
  'api/verses/:version/:book/:chapter/:number',
  'SearchController.getVerse'
).middleware('throttle:3:300')

Route.post('api/search/', 'SearchController.search').middleware(
  'throttle:3:300'
)
