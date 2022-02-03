import { gql } from 'apollo-server'

export const postTypeDefs = gql`
  type Post {
    content: String
    createdAt: DateTime!
    id: Int!
    published: Boolean!
    title: String!
    updatedAt: DateTime!
    viewCount: Int!
  }

  extend type User {
    posts: [Post!]!
  }
  extend type Account {
    posts: [Post!]!
  }

  extend type Query {
    posts: [Post!]!
    post(id: String!): Post!
  }
`
