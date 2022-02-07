import { gql } from 'apollo-server';
import { ApiAccounts } from './accounts/resolvers';
import { GqlApi } from './gql';
import { ApiPosts } from './posts/resolvers';
import { ApiUsers } from './users/resolvers';

const baseTypedef = gql`
  type Query
  type Mutation
  scalar DateTime

  type ArchivePayload {
    success: Boolean!
  }
`;

const apiArray: GqlApi[] = [ApiUsers, ApiAccounts, ApiPosts];

export const resolversArray = [...apiArray.map((api) => api.resolvers)];

export const typeDefsArray = [
  baseTypedef,
  ...apiArray.map((api) => api.typeDefs),
];
