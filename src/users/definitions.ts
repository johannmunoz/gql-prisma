import { gql } from 'apollo-server'

export const userTypeDefs = gql`
  type User {
    id: ID!
    email: String!
    name: String
    createdAt: DateTime
    updatedAt: DateTime
  }

  extend type Account {
    users: [User!]!
  }

  extend type Post {
    author: User!
  }

  extend type Query {
    users: [User!]!
    user(id: String!): User!
  }
`
