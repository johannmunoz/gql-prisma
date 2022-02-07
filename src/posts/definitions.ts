import { gql } from 'apollo-server';

export const postTypeDefs = gql`
  type Post {
    id: ID!
    title: String!
    content: String
    published: Boolean!
    viewCount: Int!
    createdAt: DateTime
    updatedAt: DateTime
  }

  extend type User {
    posts: [Post!]!
  }

  extend type Account {
    posts: [Post!]!
  }

  type PostPayload {
    success: Boolean!
    post: Post
  }

  extend type Query {
    posts: [Post!]!
    post(id: String!): Post!
  }

  extend type Mutation {
    postCreate(input: PostCreateInput!): PostPayload!
    postUpdate(id: String!, input: PostUpdateInput!): PostPayload!
    postDelete(id: String!): ArchivePayload!
  }

  input PostCreateInput {
    authorId: String!
    accountId: String!
    title: String!
    content: String!
  }

  input PostUpdateInput {
    title: String!
    content: String!
  }
`;
