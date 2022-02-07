import { ApolloServer } from 'apollo-server';
import { context } from './context';
import { resolversArray, typeDefsArray } from './resolvers';

async function bootstrap() {
  const server = new ApolloServer({
    resolvers: resolversArray,
    typeDefs: typeDefsArray,
    context: context,
  });

  server.listen({ port: 3000 }).then(({ url }) => {
    console.log(`Apollo Server ready at ${url}`);
  });
}

bootstrap().catch(console.error);
