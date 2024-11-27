# manaql

![visitors](https://img.shields.io/endpoint?url=https://vu-mi.com/api/v1/views?id=jcserv/manaql)

> [!IMPORTANT]
>
> ManaQL is not meant to be a replacement for Scryfall, and was intended to be a minimally-viable-replacement for the usecase highlighted.

manaql is a GraphQL API for Magic: The Gathering cards, powered by the [Scryfall API](https://scryfall.com/docs/api/bulk-data).

It currently supports basic search features (see the example queries section below) for Magic: The Gathering web applications, namely:

- get cards and all their printings, by card name(s)
- autocomplete card names

## why?

I built this to be used by [bling-my-deck](https://github.com/jcserv/bling-my-deck), which has a need to query for
{cards and all their printings, by card name}, which wasn't supported by Scryfall.

also, as a learning experience!

## where's the data coming from?

check out [manaql-ingest](https://github.com/jcserv/manaql-ingest) for the data ingestion pipeline!

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
            "value": [
              "Animate Dead",
              "Arachnogenesis",
              "Assassin's Trophy",
              "Azusa, Lost but Seeking",
              "Bala Ged Recovery",
              "Baba Lysaga, Night Witch"
            ]
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

TODO:
- better fuzzy searching