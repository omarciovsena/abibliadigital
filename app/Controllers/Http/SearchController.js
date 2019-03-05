'use strict'

const Book = use('App/Models/Book')
const Verse = use('App/Models/Verse')
const { notFound, badRequest, newRequest } = use('App/utils')

class SearchController {
  /**
   * @api {get} api/verses/:version/:book/:chapter/:number Get Verse
   * @apiVersion 0.2.0
   * @apiName GetVerse
   * @apiGroup Verses
   *
   *
   * @apiParam {String} version Bible Version [nvi, ra, acf, kjv, bbe]
   * @apiParam {String} book Abbreviation of the book of the bible [gn, ex, lv, nm, dt, ..., ap]
   * @apiParam {Number} chapter Chapter of the book
   * @apiParam {Number} number Verse Number
   *
   * @apiSuccess {String} book.abbrev Abbreviation of the book
   * @apiSuccess {String} book.name Book name
   * @apiSuccess {String} book.author Book author
   * @apiSuccess {String} book.group ame of the group that the book belongs to
   * @apiSuccess {String} book.version version Bible Version.
   * @apiSuccess {Number} chapter Chapter of the book
   * @apiSuccess {Number} number Verse Number
   * @apiSuccess {String} text Text of the verse
   * @apiSuccess {Object} book Book information
   *
   * @apiExample Example usage:
   * curl -i https://bibleapi.co/api/verses/nvi/gn/1/1
   *
   * @apiSuccessExample {json} Success-Response:
   *    HTTP/1.1 200 OK
   *    {
   *      "book": {
   *        "abbrev": "gn",
   *        "name": "Gênesis",
   *        "author": "Moisés",
   *        "group": "Pentateuco",
   *        "version": "nvi"
   *      },
   *      "chapter": 1,
   *      "number": 1,
   *      "text": "No princípio Deus criou os céus e a terra."
   *    }
   *
   * @apiError TooManyRequests When performing more than 50 requests at the same endpoint in an interval less than 5 minutes
   * @apiError VerseNotFound When the verse was not found
   *
   * @apiErrorExample {text} Error-Response:
   *    HTTP/1.1 429 Too Many Requests
   *
   * @apiErrorExample {json} Error-Response:
   *    HTTP/1.1 404 Not found
   *    {
   *      "error": {
   *        "number": "404",
   *        "message": "Not found",
   *      }
   *    }
   *
   */

  async getVerse({ request, params, response }) {
    newRequest(request.url())
    const { chapter, number, book, version } = params
    const bookData = await Book.query().where('abbrev', book)
    if (bookData.length > 0) {
      const verse = await Verse.query()
        .where('chapter', chapter)
        .where('number', number)
        .where('book_id', bookData[0].id)
        .where('version', version)
      if (verse.length > 0) {
        const { abbrev, name, author, group } = bookData[0]
        const { chapter, number, text, version } = verse[0]
        return {
          book: {
            abbrev,
            name,
            author,
            group,
            version
          },
          chapter: chapter,
          number: number,
          text: text
        }
      }
    }
    return notFound(response)
  }

  /**
   * @api {get} api/verses/:version/:book/:chapter/ Get Verses
   * @apiVersion 0.2.0
   * @apiName GetVerses
   * @apiGroup Verses
   *
   *
   * @apiParam {String} version Bible Version [nvi, ra, acf, kjv, bbe]
   * @apiParam {String} book Abbreviation of the book of the bible [gn, ex, lv, nm, dt, ..., ap]
   * @apiParam {Number} chapter Chapter of the book
   *
   * @apiSuccess {Object} book Book information
   * @apiSuccess {String} book.abbrev Abbreviation of the book
   * @apiSuccess {String} book.name Book name
   * @apiSuccess {String} book.author Book author
   * @apiSuccess {String} book.group ame of the group that the book belongs to
   * @apiSuccess {String} book.version version Bible Version
   * @apiSuccess {Object} chapter Chapter information
   * @apiSuccess {Number} chapter.number Chapter of the book
   * @apiSuccess {Number} chapter.verses Number of chapter verses
   * @apiSuccess {Object[]} verses Verses of the chapter
   * @apiSuccess {Number} verses.number Verse Number
   * @apiSuccess {String} verses.text  Text of the verse
   *
   *
   * @apiExample Example usage:
   * curl -i https://bibleapi.co/api/verses/nvi/sl/23
   *
   * @apiSuccessExample {json} Success-Response:
   *    HTTP/1.1 200 OK
{
    "book": {
        "abbrev": "sl",
        "name": "Salmos",
        "author": "David, Moisés, Salomão",
        "group": "Poéticos",
        "version": "nvi"
    },
    "chapter": {
        "number": 23,
        "verses": 6
    },
    "verses": [
        {
            "number": 1,
            "text": "O Senhor é o meu pastor; de nada terei falta."
        },
        {
            "number": 2,
            "text": "Em verdes pastagens me faz repousar e me conduz a águas tranqüilas;"
        },
        {
            "number": 3,
            "text": "restaura-me o vigor. Guia-me nas veredas da justiça por amor do seu nome."
        },
        {
            "number": 4,
            "text": "Mesmo quando eu andar por um vale de trevas e morte, não temerei perigo algum, pois tu estás comigo; a tua vara e o teu cajado me protegem."
        },
        {
            "number": 5,
            "text": "Preparas um banquete para mim à vista dos meus inimigos. Tu me honras, ungindo a minha cabeça com óleo e fazendo transbordar o meu cálice."
        },
        {
            "number": 6,
            "text": "Sei que a bondade e a fidelidade me acompanharão todos os dias da minha vida, e voltarei à casa do Senhor enquanto eu viver."
        }
    ]
}
   *
   * @apiError TooManyRequests When performing more than 50 requests at the same endpoint in an interval less than 5 minutes
   * @apiError VerseNotFound When the verse was not found
   *
   * @apiErrorExample {text} Error-Response:
   *    HTTP/1.1 429 Too Many Requests
   *
   * @apiErrorExample {json} Error-Response:
   *    HTTP/1.1 404 Not found
   *    {
   *      "error": {
   *        "number": "404",
   *        "message": "Not found",
   *      }
   *    }
   *
   */

  async getChapter({ request, params, response }) {
    newRequest(request.url())
    const { chapter, book, version } = params
    const bookData = await Book.query().where('abbrev', book)
    if (bookData.length > 0) {
      const verses = await Verse.query()
        .where('chapter', chapter)
        .where('book_id', bookData[0].id)
        .where('version', version)
        .orderBy('number')
      if (verses.length > 0) {
        const { abbrev, name, author, group } = bookData[0]
        const { chapter, version } = verses[0]
        return {
          book: {
            abbrev,
            name,
            author,
            group,
            version
          },
          chapter: {
            number: chapter,
            verses: verses.length
          },
          verses: [
            ...verses.map(verse => ({
              number: verse.number,
              text: verse.text
            }))
          ]
        }
      }
    }
    return notFound(response)
  }

  /**
   * @api {get} api/books/ Get Books
   * @apiVersion 0.2.0
   * @apiName getBooks
   * @apiGroup Books
   *
   *
   * @apiSuccess {Array[]} books Book list
   * @apiSuccess {String} books.abbrev Abbreviation of the book
   * @apiSuccess {String} books.author Book author
   * @apiSuccess {Number} books.chapters Number of chapters
   * @apiSuccess {String} books.group ame of the group that the book belongs to
   * @apiSuccess {String} books.name Book name
   * @apiSuccess {String} books.testament Which will is located
   *
   *
   * @apiExample Example usage:
   * curl -i https://bibleapi.co/api/books/
   *
   * @apiSuccessExample {json} Success-Response:
   *    HTTP/1.1 200 OK
[
    {
        "abbrev": "gn",
        "author": "Moisés",
        "chapters": 50,
        "group": "Pentateuco",
        "name": "Gênesis",
        "testament": "VT"
    },
    {
        "abbrev": "ex",
        "author": "Moisés",
        "chapters": 40,
        "group": "Pentateuco",
        "name": "Êxodo",
        "testament": "VT"
    },
    {
        "abbrev": "lv",
        "author": "Moisés",
        "chapters": 27,
        "group": "Pentateuco",
        "name": "Levítico",
        "testament": "VT"
    },
    {
        "abbrev": "nm",
        "author": "Moisés",
        "chapters": 36,
        "group": "Pentateuco",
        "name": "Números",
        "testament": "VT"
    },
    ...
]
   *
   * @apiError TooManyRequests When performing more than 50 requests at the same endpoint in an interval less than 5 minutes
   *
   * @apiErrorExample {text} Error-Response:
   *    HTTP/1.1 429 Too Many Requests
   */

  async getBooks({ request, params }) {
    console.log(params)
    if (params.count !== 'false') {
      newRequest(request.url())
    }
    const books = await Book.query().orderBy('id')
    return books.map(book => ({
      abbrev: book.abbrev,
      author: book.author,
      chapters: book.chapters,
      group: book.group,
      name: book.name,
      testament: book.testament
    }))
  }

  /**
   * @api {get} api/books/:abbrev Get Book
   * @apiVersion 0.2.0
   * @apiName getBook
   * @apiGroup Books
   *
   *
   * @apiSuccess {String} abbrev Abbreviation of the book
   * @apiSuccess {String} author Book author
   * @apiSuccess {String} comment Book review
   * @apiSuccess {Number} chapters Number of chapters
   * @apiSuccess {String} group ame of the group that the book belongs to
   * @apiSuccess {String} name Book name
   * @apiSuccess {String} testament Which will is located
   *
   *
   * @apiExample Example usage:
   * curl -i https://bibleapi.co/api/books/gn
   *
   * @apiSuccessExample {json} Success-Response:
   *    HTTP/1.1 200 OK
    {
        "abbrev": "gn",
        "author": "Moisés",
        "comment": "Uma vez que este livro anônimo integra o Pentateuco unificado",
        "chapters": 50,
        "group": "Pentateuco",
        "name": "Gênesis",
        "testament": "VT"
    }
   *
   * @apiError TooManyRequests When performing more than 50 requests at the same endpoint in an interval less than 5 minutes
   * @apiError VerseNotFound When the verse was not found
   *
   * @apiErrorExample {text} Error-Response:
   *    HTTP/1.1 429 Too Many Requests
   *
   * @apiErrorExample {json} Error-Response:
   *    HTTP/1.1 404 Not found
   *    {
   *      "error": {
   *        "number": "404",
   *        "message": "Not found",
   *      }
   *    }
   *
   */

  async getBook({ request, params, response }) {
    newRequest(request.url())
    const book = await Book.findBy('abbrev', params.book)
    return book
      ? {
          abbrev: book.abbrev,
          author: book.author,
          chapters: book.chapters,
          comment: book.comment,
          group: book.group,
          name: book.name,
          testament: book.testament
        }
      : notFound(response)
  }

  /**
   * @api {post} api/search/ Search
   * @apiVersion 0.2.0
   * @apiName Search
   * @apiGroup Search
   *
   *
   * @apiSuccess {Number} occoccurrences Number of verses found with the search
   * @apiSuccess {String} version Version name
   * @apiSuccess {Array} verses  Verses array
   * @apiSuccess {String} verses.book Abbrev of the book
   * @apiSuccess {Number} verses.chapter Chapter of the verse
   * @apiSuccess {Number} verses.number Verse Number
   * @apiSuccess {String} verses.text  Text of the verse
   *
   *
   * @apiExample Example usage:
   * curl -X POST \
   *  https://bibleapi.co/api/search/ \
   *  -H 'Content-Type: application/json' \
   *  -H 'Postman-Token: 2ae92434-1f35-41e6-9e5b-33ed1c7e2c28' \
   *  -H 'cache-control: no-cache' \
   *  -d '{
   *  "version": "nvi",
   *  "search": "No princípio Deus"
   *  }'
   *
   * @apiSuccessExample {json} Success-Response:
   *    HTTP/1.1 200 OK
    {
        "occoccurrences": 1,
        "version": "nvi",
        "verses": [
            {
                "book": "gn",
                "chapter": 1,
                "number": 1,
                "text": "No princípio Deus criou os céus e a terra."
            }
        ]
    }
   *
   * @apiError TooManyRequests When performing more than 50 requests at the same endpoint in an interval less than 5 minutes
   * @apiError VerseNotFound When the verse was not found
   * @apiError BadRequest When the required parameters are not sent
   *
   * @apiErrorExample {text} Error-Response:
   *    HTTP/1.1 429 Too Many Requests
   *
   * @apiErrorExample {json} Error-Response:
   *    HTTP/1.1 404 Not found
   *    {
   *      "error": {
   *        "number": "404",
   *        "message": "Not found",
   *      }
   *    }
   *
   * @apiErrorExample {json} Error-Response:
   *    HTTP/1.1 404 Not found
   * {
   *  "error": {
   *    "number": 400,
   *    "message": "Bad Request - version and search are required parameters"
   *  }
   * }
   */

  async search({ request, response }) {
    newRequest(request.url())
    const { version, search } = request.all()
    if (!version || !search) {
      return badRequest(
        response,
        '{{version}} and {{search}} are required parameters'
      )
    }
    const wordsLength = search.split(' ').length
    let verses
    if (wordsLength === 1) {
      verses = await Verse.query()
        .where('version', version)
        .whereRaw(
          `text LIKE '% ${search} %' or text LIKE '% ${search}.%' or text LIKE '${search} %' or text LIKE '% ${search}'`
        )
    } else {
      verses = await Verse.query()
        .where('version', version)
        .whereRaw(`text LIKE '%${search}%'`)
        .orderBy('book_id')
    }

    const books = await Book.query()

    if (verses.length > 0) {
      return {
        occoccurrences: verses.length,
        version: version,
        verses: verses.map(verse => ({
          book: books.find(book => book.id === verse.book_id).abbrev,
          chapter: verse.chapter,
          number: verse.number,
          text: verse.text
        }))
      }
    }
    return notFound(response)
  }
}

module.exports = SearchController
