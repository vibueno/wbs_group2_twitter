# Twitter clone backend (group 2)

## Table of Contents

- [Description](#description)
- [Endpoints](#endpoints)
- [Live](#live)
- [Programming](#programming)

## Description

This repository contains the back-end part of a Twitter clone application, created for a WBS Coding School assignment.

## Endpoints

| HTTP Method | Endpoint                                                                           | Description                                 |
| ----------- | ---------------------------------------------------------------------------------- | ------------------------------------------- |
| GET         | [/users](https://wbsgroup2twitter.herokuapp.com/users)                             | Retrieves all users                         |
| GET         | [/users/:userid](https://wbsgroup2twitter.herokuapp.com/users/1)                   | Retrieves user with id=userid               |
| GET         | [/messages](https://wbsgroup2twitter.herokuapp.com/messages)                       | Retrieves all messages                      |
| GET         | [/messages/:msgid](https://wbsgroup2twitter.herokuapp.com/messages/1)              | Retrieves message with id=msgid             |
| GET         | [/users/:userid/messages](https://wbsgroup2twitter.herokuapp.com/users/1/messages) | Retrieves messages from user with id=userid |

## Live

This application is hosted on [Heroku](https://wbsgroup2twitter.herokuapp.com/messages).

## Programming

This project has been developed using [NodeJS](https://nodejs.org/en) and [ExpressJS](https://expressjs.com).

### Helpers

- [Prettier](https://prettier.io/): [install Prettier](https://prettier.io/docs/en/editors.html) for your code editor. Prettier can run 'on file save', so that you don't need to run it manually. Look for instructions on how to set it up in your code editor, if needed.

- [ESLint](https://eslint.org)
