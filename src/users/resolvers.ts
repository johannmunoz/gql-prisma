import { Account, Post, User } from '@prisma/client'
import { Context } from '../context'
import { GqlApi } from '../gql'
import { userTypeDefs } from './definitions'

const resolvers = {
  Mutation: {
    userCreate,
    userUpdate,
    userDelete,
  },
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

async function user(root: any, { id }, context: Context) {
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

async function userCreate(root: any, { input }, context: Context) {
  try {
    const newUser = input

    const data = await context.prisma.user.create({ data: newUser })
    return { success: true, user: data }
  } catch (error) {
    console.error(error)
    return { success: false, user: null }
  }
}

async function userUpdate(root: any, { id, input }, context: Context) {
  try {
    const userData = input

    const data = await context.prisma.user.update({
      where: { id: id },
      data: userData,
    })
    return { success: true, user: data }
  } catch (error) {
    console.error(error)
    return { success: false, user: null }
  }
}

async function userDelete(root: any, { id }, context: Context) {
  try {
    await context.prisma.user.delete({
      where: { id: id },
    })
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false }
  }
}

export const ApiUsers: GqlApi = {
  typeDefs: userTypeDefs,
  resolvers,
}
