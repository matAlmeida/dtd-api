# dtd-api

# Usage

You will need `Node 10.x` installed and `Yarn 1.x`

## Database

You can configure a postgres database by hand or you can use the docker-compose image in the project root.

To install the database using `docker-compose` make sure to have `docker` and `docker-compose` installed in your machine, then run the following commands:

```sh
$ docker-compose build
$ docker-compose up
$ yarn db:migrate
```

## Enviroment Variables

Duplicate the `.env.example` file and replace with correct values

## Running running the project

`Note: Make sure the you did the 2 steps above`

```sh
$ yarn dev
```

## Architecture

We are using a `Domain Driving Design (DDD)` in this projects. This way we can easily scale and keep the code focused in the bussines logic.

### Folder structure

```sh
/src # All the code goes here
  /app.ts # Create the express app, add base middlewares and the routes
  /routes.ts # A script that goes through all use-cases routes.ts files to require the routes
  /server.ts # Initialize the express app in the correct port
  /config # Configuration constants
  /database # TypeORM folder containing migrations and seeders
  /libs # Codes that are necessary for the project but isn't a bussiness logic
  /models # Base usecases models and request errors
  /domains # Contain all the domains used in the project
    /core # Implementations that can possibly be used in all the domains
    /<domain-name>
      /routes.ts # A file that connect each usecase controller to a route path in express
      /entities # Definition of the entity of the domain, in this case we are using a class that can also be used by TypeORM
      /mail # Folder with emails templates
      /providers # Implementation of third party services using an abstract interface above it
      /repositories # Implementation of data manipulation services for the domain entities
      /use-cases # Contain the use cases for the domain
        /<use-case-name>
          /<use-case-name>.controller.ts # A file that connects the use cases to the HTTP interface, in this case express routes
          /<use-case-name>.dto.ts # Interfaces that defines how the entity Data Object is transformed for that use case
          /<use-case-name>.test.ts # Contain the unit tests for the use case
          /<use-case-name>.usecase.ts # The Implementation of the use case
```

## Tech

### TypeORM

A typescript foucused ORM that can be used with any SQL Database.

### Postgres

A SQL Database with powerful features

### Express

Highly configurable REST App for Node
