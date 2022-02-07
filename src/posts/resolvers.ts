import { Account, User } from '@prisma/client';
import { Context } from '../context';
import { GqlApi } from '../gql';
import { postTypeDefs } from './definitions';

const resolvers = {
  Mutation: {
    postCreate,
    postUpdate,
    postDelete,
  },
  Query: {
    posts,
    post,
  },
  Account: {
    posts: accountPosts,
  },
  User: {
    posts: userPosts,
  },
};

async function posts(root: any, _: any, context: Context) {
  try {
    const data = await context.prisma.post.findMany();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function post(root: any, { id }, context: Context) {
  try {
    const data = await context.prisma.post.findUnique({ where: { id: id } });
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function accountPosts(account: Account, _: any, context: Context) {
  try {
    const data = await context.prisma.post.findMany({
      where: { accountId: account.id },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function userPosts(user: User, _: any, context: Context) {
  try {
    const data = await context.prisma.post.findMany({
      where: { authorId: user.id },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function postCreate(root: any, { input }, context: Context) {
  try {
    const newPost = input;

    const data = await context.prisma.post.create({ data: newPost });
    return { success: true, post: data };
  } catch (error) {
    console.error(error);
    return { success: false, post: null };
  }
}

async function postUpdate(root: any, { id, input }, context: Context) {
  try {
    const postData = input;

    const data = await context.prisma.post.update({
      where: { id: id },
      data: postData,
    });
    return { success: true, post: data };
  } catch (error) {
    console.error(error);
    return { success: false, post: null };
  }
}

async function postDelete(root: any, { id }, context: Context) {
  try {
    await context.prisma.post.delete({
      where: { id: id },
    });
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

export const ApiPosts: GqlApi = {
  typeDefs: postTypeDefs,
  resolvers,
};
