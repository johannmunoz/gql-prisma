import { gql } from 'apollo-server'

export const accountTypeDefs = gql`
  type Account {
    id: ID!
    name: String
    createdAt: DateTime
    updatedAt: DateTime
  }

  extend type User {
    account: Account!
  }

  extend type Post {
    account: Account!
  }

  type AccountPayload {
    success: Boolean!
    account: Account
  }

  extend type Query {
    accounts: [Account!]!
    account(id: String!): Account!
  }

  extend type Mutation {
    accountCreate(input: AccountCreateInput!): AccountPayload!
    accountUpdate(id: Int!, input: AccountUpdateInput!): AccountPayload!
    accountDelete(id: Int!): ArchivePayload!
  }

  input AccountCreateInput {
    name: String!
  }

  input AccountUpdateInput {
    name: String!
  }
`
