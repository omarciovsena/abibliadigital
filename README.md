<p align="center">
  <a href="https://www.patreon.com/join/bibleapi" target="_blank">
    <img src="https://cdn-std.dprcdn.net/files/acc_649651/plrSCT" height="80" alt="Patreon">
  </a>
</p>
<p align="center">
  <img src="https://bibleapi.co/theme/images/brand.png" alt="bibleAPI" width="150">
</p>
<p align="center">
  <a href="https://bibleapi.co">bibleAPI.co</a> is a RESTful API of the Holy Bible  developed with <a href="https://adonisjs.com/">AdonisJs</a> 🚀
</p>

<p align="center">
  <a href="https://stats.uptimerobot.com/5PXmCNLM" title="Uptimerobot">
    <img src="https://img.shields.io/uptimerobot/ratio/m778918918-3e92c097147760ee39d02d36.svg" alt="Uptimerobot">
  </a>
  <a href="https://stats.uptimerobot.com/5PXmCNLM" title="Circle CI">
    <img src="https://circleci.com/gh/ofallante/bibleapi.svg?style=shield&circle-token=d5991d37b216f8da35b279de6789085300b5c75e" alt="Circle Ci"/>
  </a>
  <a href="https://github.com/ofallante/bibleapi/blob/dev/LICENSE" title="license">
    <img src="https://badgen.net/badge/license/BSD/blue" alt="BSD License">
  </a>
</p>

## ► Documentation

- [📘 Documentation](https://doc.bibleapi.co) - apiDoc
- [😍 Home Page](https://bibleapi.co)

## ► Usage

- `GET https://bibleapi.co/api/books/:abbrev`
- `GET https://bibleapi.co/api/books/`
- `POST https://bibleapi.co/api/search/`
  - body:
  ```
  {
    "version": ":version",
    "search": ":work"
  }
  ```
- `GET https://bibleapi.co/api/verses/:version/:book/:chapter/:number`
- `GET https://bibleapi.co/api/verses/:version/:book/:chapter/`

## ► Installation

#### Dependencies

- [Yarn](https://adonisjs.com/)
- [AdonisJs](https://adonisjs.com/)

#### Setup

- Download this source code into a working directory.
- Install the requirements: `yarn`
- Create `.env` file
- Run migrations `yarn migrations`
- Run the server using the following command: `yarn start:dev`
- Visit `localhost:3333` to see the running website!

## ► Fair use policy

bibleAPI is free and open to use. The project is primarily an educational tool, and we will not tolerate denial of service attacks preventing people from learning.

## ► Credits and Thanks

- [@thiagobodruk](https://github.com/thiagobodruk/) for sharing various versions of the bible in json

## ► Contributing

Contributions, issues and feature requests are very welcome.
Please make sure to read the [Contributing Guide](/CONTRIBUTING.md) before making a pull request.

Visite our [trello](https://trello.com/b/VPGRzM36/biblieapi) board

## ► Contributor

Created and maintained by:

<!-- prettier-ignore -->
| [<img src="https://avatars0.githubusercontent.com/u/3450717?s=460&v=4" width="60px;"/><br /><sub><b>Márcio Sena</b></sub>](https://github.com/marciovsena)<br />[💻](https://github.com/marciovsena/bibleapi/commits?author=marciovsena "Code") [📖](https://github.com/marciovsena/bibleapi/commits?author=marciovsena "Documentation") [🐛](https://github.com/marciovsena/bibleapi/issues?q=author%3Amarciovsena "Bug reports")
| :---: |
