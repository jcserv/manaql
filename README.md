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

## example queries

POST https://api.manaql.com/graphql

<details>
  <summary>Get cards by name and all of their printings</summary>
  
  ### Request
  ```graphql
  query Cards($filter: CardFilter!, $first: Int) {
    cards(filter: $filter, first: $first) {
      edges {
        node {
          cardId
          name
          mainType
          printings {
            edges {
              node {
                id
                set
                imageUri
              }
            }
          }
        }
      }
    }
  }
  ```

### Variables

```json
{
  "filter": {
    "fields": ["name"],
    "operator": "eq",
    "query": [
      "Animate Dead",
      "Arachnogenesis",
      "Assassin's Trophy",
      "Azusa, Lost but Seeking",
      "Bala Ged Recovery",
      "Baba Lysaga, Night Witch"
    ]
  },
  "first": 10
}
```

</details>

<br />

<details>
  <summary>Get cards by name and all of their printings, filtering by certain finishes and sets</summary>
  
  ### Request
  ```graphql
  query ExcludeCertainFinishesAndSets($filter: CardFilter!, $first: Int, $filters: [PrintingFilter!]) {
    cards(filter: $filter, first: $first) {
      edges {
        node {
          cardId
          name
          mainType
          printings(filters: $filters) {
            edges {
              node {
                id
                set
                imageUri
                finishes
                set
              }
            }
          }
        }
      }
    }
  }
  ```

### Variables

```json
{
  "filter": {
    "fields": ["name"],
    "operator": "eq",
    "query": [
      "Animate Dead",
      "Arachnogenesis",
      "Assassin's Trophy",
      "Azusa, Lost but Seeking",
      "Bala Ged Recovery",
      "Baba Lysaga, Night Witch"
    ]
  },
  "first": 10,
  "filters": [
    {
      "fields": "set",
      "operator": "ne",
      "query": [
        "sld"
      ]
    },
    {
      "fields": "finishes",
      "operator": "co",
      "query": ["nonfoil", "foil"] // if you want to exclude a finish, just don't include it in the query
    }
  ]
}
```

</details>

<br />

<details>
  <summary>Autocomplete/typeahead</summary>

### Request

```graphql
query Autocomplete($filter: CardFilter!, $first: Int) {
  cards(filter: $filter, first: $first) {
    edges {
      node {
        cardId
        name
      }
    }
  }
}
```

### Variables

```json
{
  "filter": {
    "fields": ["name"],
    "query": ["Baba Ly"],
    "operator": "sw"
  },
  "first": 10
}
```

### Response

```json
{
  "data": {
    "cards": {
      "edges": [
        {
          "node": {
            "cardId": "10561",
            "name": "Baba Lysaga, Night Witch"
          }
        }
      ]
    }
  }
}
```

</details>

<br />

TODO:

- better fuzzy searching
