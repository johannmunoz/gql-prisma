import { gql } from 'apollo-server-express';

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
    accountUpdate(id: String!, input: AccountUpdateInput!): AccountPayload!
    accountDelete(id: String!): ArchivePayload!
  }

  input AccountCreateInput {
    name: String!
  }

  input AccountUpdateInput {
    name: String!
  }
`;
