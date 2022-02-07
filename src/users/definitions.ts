import { gql } from 'apollo-server';

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

  type UserPayload {
    success: Boolean!
    user: User
  }

  extend type Query {
    users: [User!]!
    user(id: String!): User!
  }

  extend type Mutation {
    userCreate(input: UserCreateInput!): UserPayload!
    userUpdate(id: String!, input: UserUpdateInput!): UserPayload!
    userDelete(id: String!): ArchivePayload!
  }

  input UserCreateInput {
    accountId: String!
    name: String!
    email: String!
  }

  input UserUpdateInput {
    name: String!
    email: String!
  }
`;
