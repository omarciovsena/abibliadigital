<p align="center">
  <a href="https://www.patreon.com/join/bibleapi" target="_blank">
    <img src="https://cdn-std.dprcdn.net/files/acc_649651/plrSCT" height="80" alt="Patreon">
  </a>
</p>
<p align="center">
  <img src="https://bibleapi.co/theme/images/brand.png" alt="bibleAPI" width="150">
</p>
<p align="center">
  <a href="https://bibleapi.co">bibleAPI.co</a> is a RESTful API of the Holy Bible developed with Node.js + Express + MongoDB 🚀
</p>

<p align="center">
  <a href="https://stats.uptimerobot.com/5PXmCNLM" title="Uptimerobot">
    <img src="https://img.shields.io/uptimerobot/ratio/m778918918-3e92c097147760ee39d02d36.svg" alt="Uptimerobot">
  </a>
  <a href="https://github.com/marciovsena/bibleapi/blob/dev/LICENSE" title="license">
    <img src="https://badgen.net/badge/license/BSD/blue" alt="BSD License">
  </a>
</p>

## ► Table of Contents

- [Why ?](#why-)
- [Documentation](#documentation)
- [Setup](#setup)
- [Fair use policy](#fair-use-policy)
- [Credits and Thanks](#credits-and-thanks)
- [Contributing](#contributing)
- [Contributor](#contributor)

## Why ?

Application and site development is still a complex process for churches and religious organizations.

We know that creating unique content ends up competing with basic tasks such as making devotions, verses, comments, social networking nurture, and so many other day-to-day tasks available.

We believe that we can offer many of these services, free of charge, with the professional quality and focused on the word of God.

## Documentation

### Book list

`GET https://bibleapi.co/api/books`

```
[
  {
    "abbrev": {"pt":"gn","en":"gn"},
    "author":"Moisés",
    "chapters":50,
    "group":"Pentateuco",
    "name":"Gênesis",
    "testament":"VT"
  },
  {
    "abbrev": {"pt":"ex","en":"ex"},
    "author":"Moisés",
    "chapters":40,
    "group":"Pentateuco",
    "name":"Êxodo",
    "testament":"VT"
  },
  ...
]
```

### Get Book

`GET https://bibleapi.co/api/books/:abbrev`

```
{
  "abbrev": {"pt":"mt","en":"mt"},
  "author":"Mateus",
  "chapters":28,
  "comment":"",
  "group":"Evangelhos",
  "name":"Mateus",
  "testament":"NT"
}
```

### Get Chapter

- `GET https://bibleapi.co/api/verses/:version/:abbrev/:chapter`

```
{
  "book": {
    "abbrev":{"pt":"gn","en":"gn"},
    "name":"Gênesis",
    "author":"Moisés",
    "group":"Pentateuco",
    "version":"nvi"
  },
  "chapter": {
    "number":1,
    "verses":31
  },
  "verses": [
    {"number": 1,"text":"No princípio Deus criou os céus e a terra."},
    {"number": 2,"text":"Era a terra sem forma e vazia; trevas cobriam a face do abismo, e o Espírito de Deus se movia sobre a face das águas."}
    ...
  ]
}
```

### Get Verse

`GET https://bibleapi.co/api/verses/:version/:abbrev/:chapter/:number`

```
{
  "book": {
    "abbrev":{"pt":"gn","en":"gn"},
    "name":"Gênesis",
    "author":"Moisés",
    "group":"Pentateuco",
    "version":"nvi"
  },
  "chapter": {
    "number": 1,
    "verses": 31
  },
  "chapter": 1,
  "number": 1,
  "text": "No princípio Deus criou os céus e a terra."
}
```

### Search by word

`POST https://bibleapi.co/api/verses/search`

#### Body:

```
{
  "version": "nvi",
  "search": "terra"
}
```

```
{
  "occurrence": 987,
  "version": "nvi",
  "verses": [
    {
      "book": {
          "abbrev": {
              "pt": "gn"
          }
      },
      "chapter": 1,
      "number": 2,
      "text": "Era a terra sem forma e vazia; trevas cobriam a face do abismo, e o Espírito de Deus se movia sobre a face das águas."
    },
    ...
  ]
}
```

## Setup

### Dependencies

- [Yarn](https://yarnpkg.com/en/)
- Node.JS - I recommend using [NVM](https://github.com/nvm-sh/nvm)

### Steps

- Download this source code into a working directory.
- Install the requirements: `yarn`
- Create `.env` file
- Run the server using the following command: `yarn dev`
- Visit `localhost:3000/api/check` to see the running api!

## Fair use policy

bibleAPI is free and open to use. The project is primarily an educational tool, and we will not tolerate denial of service attacks preventing people from learning.

## Credits and Thanks

- [@thiagobodruk](https://github.com/thiagobodruk/) for sharing various versions of the bible in json

## Contributing

Contributions, issues and feature requests are very welcome.
Please make sure to read the [Contributing Guide](/CONTRIBUTING.md) before making a pull request.

Visite our [trello](https://trello.com/b/VPGRzM36/biblieapi) board

## Contributor

Created and maintained by:

<!-- prettier-ignore -->
| [<img src="https://avatars0.githubusercontent.com/u/3450717?s=460&v=4" width="60px;"/><br /><sub><b>Márcio Sena</b></sub>](https://github.com/marciovsena)<br />[💻](https://github.com/marciovsena/bibleapi/commits?author=marciovsena "Code") [📖](https://github.com/marciovsena/bibleapi/commits?author=marciovsena "Documentation") [🐛](https://github.com/marciovsena/bibleapi/issues?q=author%3Amarciovsena "Bug reports")
| :---: |
