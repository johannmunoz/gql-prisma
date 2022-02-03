import { Account, Post, User } from '@prisma/client'
import { Context } from '../context'
import { GqlApi } from '../gql'
import { userTypeDefs } from './definitions'

const resolvers = {
  Query: {
    users,
    user,
  },
  Post: {
    author: postAuthor,
  },
  Account: {
    users: accountUsers,
  },
}

async function users(root: any, _: any, context: Context) {
  try {
    const data = await context.prisma.user.findMany()
    return data
  } catch (error) {
    console.error(error)
  }
}

async function user(root: any, id: number, context: Context) {
  try {
    const data = await context.prisma.user.findFirst({ where: { id: id } })
    return data
  } catch (error) {
    console.error(error)
  }
}

async function postAuthor(post: Post, _: any, context: Context) {
  try {
    const data = await context.prisma.user.findFirst({
      where: { id: post.authorId },
    })
    return data
  } catch (error) {
    console.error(error)
  }
}
async function accountUsers(account: Account, _: any, context: Context) {
  try {
    const data = await context.prisma.user.findMany({
      where: { accountId: account.id },
    })
    return data
  } catch (error) {
    console.error(error)
  }
}

export const ApiUsers: GqlApi = {
  typeDefs: userTypeDefs,
  resolvers,
}
