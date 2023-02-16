## Description

A sample NestJs app built using NodeJs/TypeScript, the [Nest](https://github.com/nestjs/nest) framework, a [Sequelize](https://docs.nestjs.com/techniques/database#sequelize-integration) ORM Integration package called [`@nestjs/sequelize`](https://github.com/sequelize/sequelize-typescript), and [MySQL](https://www.mysql.com/) RDBMS. Includes [Jest](https://jestjs.io/) unit tests with [`sequelize-mock`](https://github.com/BlinkUX/sequelize-mock) and e2e integration tests via [SuperTest](https://www.npmjs.com/package/supertest).

- Uses the `openapi-express-validator` and `@nestjs/swagger` modules to validate request/response DTOs rather than the `class-validator` which only handles validation on requests
- The swagger document is available in both JSON and YAML, and the YAML document is written to the repo for source control/maintenance.
- Uses the `@nestjs/swagger` plugin to avoid having to add `@ApiProperty()` in every DTO
- Uses `Sequelize` ORM and the `@nestjs/sequelize` TypeScript wrapper to utilize a `DatabaseModule` and custom components for a `MySQL` database.
- Uses `sequelize-mock` for Jest mock unit testing
- Uses node config `npm i config` to configure the application settings

## Simple ERD Diagram

<img width="522" alt="Screen Shot 2023-03-12 at 12 19 09 PM" src="https://user-images.githubusercontent.com/37306883/224557887-56f2ae31-4126-4f19-961f-bc3545a44259.png">

When the app is running, you can view the swagger documentation:
![Screenshot 2023-03-05 at 20-35-01 Swagger UI](https://user-images.githubusercontent.com/37306883/223000281-25457f1b-8b25-4f02-aa7b-25b135fc456e.png)

## Prerequisites

- Install NodeJs and NestJs Framework
- Install [MySQL](https://downloads.mysql.com/archives/community/)
- Obtain the default configuration settings file

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
