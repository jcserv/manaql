# manaql

![visitors](https://img.shields.io/endpoint?url=https://vu-mi.com/api/v1/views?id=jcserv/manaql)

## installation

### prerequisites

- [node.js](https://nodejs.org/en)
- [pnpm](https://pnpm.io/installation)
- [docker](https://docs.docker.com/get-started/get-docker/)

### running locally

1. clone this repo
2. run `pnpm i`
3. run `pnpm dev:db`
4. run `pnpm dev`
5. visit http://localhost:4000/graphql in your browser

### running tests
1. run `pnpm test:db:down`
2. run `pnpm test:db`
3. run `pnpm test`

### example queries

POST https://api.manaql.com/graphql

Get cards by name and all of their printings

```graphql
query Cards($filter: CardFilter!, $first: Int) {
  cards(filter: $filter, first: $first) {
    id
    name
    printings {
      edges {
        node {
          id
          set
          image_uri
        }
      }
    }
  }
}

Variables:
{
    "filter": {
        "fields": ["name"],
        "query": {
            "operator": "eq",
            "value": ["Animate Dead", "Arachnogenesis", "Assassin's Trophy", "Azusa, Lost but Seeking", "Bala Ged Recovery", "Baba Lysaga, Night Witch"]
        }
    }
}
```

Autocomplete/typeahead

```graphql
query Cards($filter: CardFilter!) {
  cards(filter: $filter) {
    id
    name
  }
}

Variables:
{
    "filter": {
        "fields": ["name"],
        "query": {
            "operator": "sw",
            "value": "Baba Ly"
        }
    },
    "first": 10
}
```

changes to copy over to template repo:

- move nodes into nodes/ folder
- fix test db using docker db
- infer builder types
- test extension