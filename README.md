# prisma-graphql-api-template

![visitors](https://img.shields.io/endpoint?url=https://vu-mi.com/api/v1/views?id=jcserv/prisma-graphql-api-template)

this template can be used to quickly setup a prisma + graphql + typescipt project,
with all the required configuration out of the box.

## features

- 💠 prisma orm, apollo server, pothos, relay
- 🌀 code generation
- 📦 dataloaders! (n+1 problem begone!)
- 🧪 unit/e2e tests setup
- 🚀 dev workflow tools galore (vscode, husky, eslint, prettier, etc)
- ✅ continuous integration with github workflows

## installation

### prerequisites

- [node.js](https://nodejs.org/en)
- [pnpm](https://pnpm.io/installation)
- [docker](https://docs.docker.com/get-started/get-docker/)

### using this template

1. create a Github repository, using this template
2. replace all instances of "prisma-graphql-api-template" with "<YOUR_REPO_NAME>"
3. initialize your .env file (see .env.example)
4. go to your github repo settings and add the following secrets:
   - DATABASE_URL
   - POSTGRES_USER
   - POSTGRES_PASSWORD
   - POSTGRES_DB

### running locally

1. clone this repo
2. run `pnpm i`
3. run `pnpm dev:db`
4. run `pnpm dev`
5. visit http://localhost:4000/graphql in your browser
