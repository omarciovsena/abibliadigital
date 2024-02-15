<p align="center">
  <a href="https://www.patreon.com/join/omarciovsena" target="_blank">
    <img src="https://cdn-std.dprcdn.net/files/acc_649651/plrSCT" height="80" alt="Patreon">
  </a>
</p>
<p align="center">
  <img src="https://www.abibliadigital.com.br/theme-v2/images/logo-a-biblia-digital.svg" alt="ABibliaDigital" width="150">
</p>
<p align="center">
  <a href="https://www.abibliadigital.com.br">ABibliaDigital.com.br</a> is a RESTful API of the Holy Bible developed with Node.js + Express + MongoDB 🚀
</p>

<p align="center">
  <a href="https://stats.uptimerobot.com/5PXmCNLM" title="Uptimerobot">
    <img src="https://img.shields.io/uptimerobot/ratio/m778918918-3e92c097147760ee39d02d36.svg" alt="Uptimerobot">
  </a>
  <a href="https://github.com/omarciovsena/abibliadigital/blob/dev/LICENSE" title="license">
    <img src="https://badgen.net/badge/license/BSD/blue" alt="BSD License">
  </a>
  <a href="https://codeclimate.com/github/omarciovsena/abibliadigital/maintainability"><img src="https://api.codeclimate.com/v1/badges/2cf1c4940336ad7911be/maintainability" /></a>
  <a href="https://discord.gg/Te3fkHg"><img src="https://img.shields.io/discord/722477891102834789.svg?label=&logo=discord&logoColor=ffffff&color=7389D8&labelColor=6A7EC2" /></a>  
</p>

## ► Table of Contents

- [Why ?](#why-)
- [Setup](#setup)
- [Setup using Docker](#setup-using-docker)
- [Fair use policy](#fair-use-policy)
- [Documentation](https://github.com/omarciovsena/abibliadigital/blob/master/DOCUMENTATION.md)
- [Credits and Thanks](#credits-and-thanks)
- [Contributing](#contributing)
- [Contributor](#contributor)

## Why ?

Application and site development is still a complex process for churches and religious organizations.

We know that creating unique content ends up competing with basic tasks such as making devotions, verses, comments, social networking nurture, and so many other day-to-day tasks available.

We believe that we can offer many of these services free of charge, with professional quality and focused on the word of God.

## Setup

### Dependencies

- [Mongodb](https://www.mongodb.com/)
- [Yarn](https://yarnpkg.com/en/)
- [Redis](https://formulae.brew.sh/formula/redis)
- Node.JS - I recommend using [NVM](https://github.com/nvm-sh/nvm)

### Steps

- Download this source code into a working directory.
- Install the requirements: `yarn`
- Create `.env` file:

```
MONGODB_URI=mongodb://localhost/abibliadigital
NODE_ENV="development"
SECRET_KEY=""
REDIS_URL="redis://127.0.0.1:6379"
```

- Run the server using the following command: `yarn dev`
- Visit `localhost:3000/api/check` to see the running api!


## Setup using Docker

If you do not want to install Mongo, Redis, Node and Yarn, follow these steps.

### Dependencies

- [Docker](https://docs.docker.com/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Steps

- Download this source code into a working directory. (Keep the directory name as "abibliadigital")
- Run the project using the following command: `docker-compose up`
- Visit `localhost:3000/api/check` to see the running api!

## Rate Limit

- Without authentication the limit rate is 20 requests/hour/ip
- With user token, requests are unlimited (it's free)

<i>Note: The limit rate was created to decrease the effectiveness of the attacks that we have been suffering from since 3/29/2020</i>

## Fair use policy

ABibliaDigital is free and open to use. The project is primarily an educational tool, and we will not tolerate denial of service attacks preventing people from learning.

## Credits and Thanks

- [@thiagobodruk](https://github.com/thiagobodruk/) for sharing various versions of the bible in json

## Contributing

Contributions, issues and feature requests are very welcome.
Please make sure to read the [Contributing Guide](/CONTRIBUTING.md) before making a pull request.

Visit our [trello](https://trello.com/b/VPGRzM36/biblieapi) board

## Contributor

Created and maintained by:

<!-- prettier-ignore -->
| [<img src="https://avatars0.githubusercontent.com/u/3450717?s=460&v=4" width="60px;"/><br /><sub><b>Márcio Sena</b></sub>](https://github.com/omarciovsena)<br />[💻](https://github.com/omarciovsena/abibliadigital/commits?author=marciovsena "Code") [📖](https://github.com/omarciovsena/abibliadigital/commits?author=omarciovsena "Documentation") [🐛](https://github.com/omarciovsena/abibliadigital/issues?q=author%3Aomarciovsena "Bug reports")
| :---: |
