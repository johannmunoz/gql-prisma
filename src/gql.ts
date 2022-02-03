import { IResolvers } from "@graphql-tools/utils";
import { DocumentNode } from "graphql";

export type GqlApi = {
  typeDefs: DocumentNode,
  resolvers: IResolvers
}