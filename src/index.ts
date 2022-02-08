import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { execute, subscribe } from 'graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { context } from './context';
import { resolversArray, typeDefsArray } from './resolvers';
import Redis from 'ioredis';

export const pubsub = new RedisPubSub({
  publisher: new Redis(6379, 'localhost', {
    retryStrategy: (times) => {
      return Math.min(times * 50, 2000);
    },
  }),
  subscriber: new Redis(6379, 'localhost', {
    retryStrategy: (times) => {
      return Math.min(times * 50, 2000);
    },
  }),
});

async function bootstrap() {
  const app = express();
  const httpServer = createServer(app);

  const schema = makeExecutableSchema({
    typeDefs: typeDefsArray,
    resolvers: resolversArray,
  });

  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
    },
    {
      server: httpServer,
      path: '/graphql',
    }
  );

  const server = new ApolloServer({
    schema,
    context: context,
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
  });

  await server.start();
  server.applyMiddleware({ app });

  const PORT = 4000;
  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}/graphql`)
  );
}

bootstrap().catch(console.error);
