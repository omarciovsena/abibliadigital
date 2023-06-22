import { genericError, notFound, randomNumber } from "../helpers/";
import Verse from "../models/verse";
import { getItem as getBook, getList as getBooks } from "./book";
import { saveRequest } from "./request";

export const getChapter = async (req, res) => {
  try {
    await saveRequest(req);
    const { version, abbrev, chapter } = req.params;
    const book = await getBook(abbrev);
    if (!book) {
      return notFound(res, "Book");
    }
    const verses = await getList(req.params);
    if (!verses || verses.length === 0) {
      return notFound(res, "Chapter");
    }
    res.json({
      book: {
        abbrev: book.abbrev,
        name: book.name,
        author: book.author,
        group: book.group,
        version,
      },
      chapter: {
        number: parseInt(chapter),
        verses: verses.length,
      },
      verses: verses.map((c) => ({
        number: c.number,
        text: c.text,
      })),
    });
  } catch (err) {
    /* istanbul ignore next */
    genericError(res, err);
  }
};

export const getVerse = async (req, res) => {
  try {
    await saveRequest(req);
    const { abbrev } = req.params;
    const book = await getBook(abbrev);
    if (!book) {
      return notFound(res, "Book");
    }
    const verse = await getItem(req.params);

    if (!verse) {
      return notFound(res, "Verse");
    }
    res.json({
      book: {
        abbrev: book.abbrev,
        name: book.name,
        author: book.author,
        group: book.group,
        version: verse.version,
      },
      chapter: verse.chapter,
      number: verse.number,
      text: verse.text,
    });
  } catch (err) {
    /* istanbul ignore next */
    genericError(res, err);
  }
};

export const getRandomVerse = async (req, res) => {
  try {
    await saveRequest(req);
    const { version, abbrev } = req.params;
    let book = abbrev && (await getBook(abbrev));
    if (!book) {
      const books = await getBooks();
      book = books[randomNumber(books.length)];
    }
    const allVerses = await getList({
      version,
      abbrev: book.abbrev.pt,
      chapter: randomNumber(book.chapters),
    });
    const verse = allVerses[randomNumber(allVerses.length) - 1];

    return res.json({
      book: {
        abbrev: book.abbrev,
        name: book.name,
        author: book.author,
        group: book.group,
        version: verse.version,
      },
      chapter: verse.chapter,
      number: verse.number,
      text: verse.text,
    });
  } catch (err) {
    /* istanbul ignore next */
    genericError(res, err);
  }
};

export const search = async (req, res) => {
  try {
    await saveRequest(req);
    const { version, search } = req.body;
    const bookList = {};
    const books = await getBooks();
    books.map((book) => {
      bookList[book.abbrev.en] = book;
    });

    if (!version) {
      return notFound(res, "Version");
    }

    var expression = new RegExp(
      "" +
        search
          .split(" ")
          .map(function (word) {
            return "(?=.*\\b" + word + "\\b)";
          })
          .join("") +
        ".+"
    );

    const verses = await Verse.find({
      version,
      text: expression,
    });

    res.json({
      occurrence: verses.length,
      version,
      verses: verses.map((verse) => ({
        book: bookList[verse.book.abbrev.en],
        chapter: verse.chapter,
        number: verse.number,
        text: verse.text,
      })),
    });
  } catch (err) {
    /* istanbul ignore next */
    genericError(res, err);
  }
};

export const getVersesInRange = async (req, res) => {
  try {
    await saveRequest(req);
    const { abbrev } = req.params;
    const book = await getBook(abbrev);
    if (!book) {
      return notFound(res, "Book");
    }

    const { chapter, range } = req.params;
    const [startVerse, endVerse] = range.split("-");

    const verses = await getVerses(abbrev, chapter, startVerse, endVerse);

    if (verses.length === 0) {
      return notFound(res, "Verses");
    }

    const firstVerse = verses[0];

    res.json({
      book: {
        abbrev: book.abbrev,
        name: book.name,
        author: book.author,
        group: book.group,
        version: firstVerse.version,
      },
      chapter: firstVerse.chapter,
      verses: verses.map((verse) => ({
        number: verse.number,
        text: verse.text,
      })),
    });
  } catch (err) {
    genericError(res, err);
  }
};

const getVerses = async (abbrev, chapter, startVerse, endVerse) => {
  return Verse.find({
    $or: [{ "book.abbrev.pt": abbrev }, { "book.abbrev.en": abbrev }],
    chapter: parseInt(chapter),
    number: { $gte: parseInt(startVerse), $lte: parseInt(endVerse) },
  });
};

const getList = async (params) => {
  const { version, abbrev, chapter } = params;
  return Verse.aggregate([
    {
      $match: {
        $or: [{ "book.abbrev.pt": abbrev }, { "book.abbrev.en": abbrev }],
        chapter: parseInt(chapter),
        version,
      },
    },
    {
      $sort: { number: 1 },
    },
  ]);
};

const getItem = async (params) => {
  const { version, abbrev, chapter, number } = params;
  return Verse.findOne({
    $or: [{ "book.abbrev.pt": abbrev }, { "book.abbrev.en": abbrev }],
    chapter: parseInt(chapter),
    number: parseInt(number),
    version,
  });
};
