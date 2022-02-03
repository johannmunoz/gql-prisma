import { Account, User } from '@prisma/client'
import { Context } from '../context'
import { GqlApi } from '../gql'
import { postTypeDefs } from './definitions'

const resolvers = {
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
}

async function posts(root: any, _: any, context: Context) {
  try {
    const data = await context.prisma.post.findMany()
    return data
  } catch (error) {
    console.error(error)
  }
}

async function post(root: any, id: number, context: Context) {
  try {
    const data = await context.prisma.post.findUnique({ where: { id: id } })
    return data
  } catch (error) {
    console.error(error)
  }
}

async function accountPosts(account: Account, _: any, context: Context) {
  try {
    const data = await context.prisma.post.findMany({
      where: { accountId: account.id },
    })
    return data
  } catch (error) {
    console.error(error)
  }
}

async function userPosts(user: User, _: any, context: Context) {
  try {
    const data = await context.prisma.post.findMany({
      where: { authorId: user.id },
    })
    return data
  } catch (error) {
    console.error(error)
  }
}

export const ApiPosts: GqlApi = {
  typeDefs: postTypeDefs,
  resolvers,
}
