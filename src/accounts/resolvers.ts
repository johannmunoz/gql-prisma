import { Post, User } from '@prisma/client'
import { Context } from '../context'
import { GqlApi } from '../gql'
import { accountTypeDefs } from './definitions'

const resolvers = {
  Mutation: {
    accountCreate,
    accountUpdate,
    accountDelete,
  },
  Query: {
    accounts,
    account,
  },
  User: {
    account: userAccount,
  },
  Post: {
    account: postAccount,
  },
}

async function accounts(root: any, _: any, context: Context) {
  try {
    const data = await context.prisma.account.findMany()
    console.log(data);
    return data
  } catch (error) {
    console.error(error)
  }
}

async function account(root: any, { id }, context: Context) {
  try {
    const data = await context.prisma.account.findUnique({ where: { id: id } })
    return data
  } catch (error) {
    console.error(error)
  }
}

async function userAccount(user: User, _: any, context: Context) {
  try {
    const data = await context.prisma.account.findUnique({
      where: { id: user.accountId },
    })
    return data
  } catch (error) {
    console.error(error)
  }
}

async function postAccount(post: Post, _: any, context: Context) {
  try {
    const data = await context.prisma.account.findUnique({
      where: { id: post.accountId },
    })
    return data
  } catch (error) {
    console.error(error)
  }
}

async function accountCreate(root: any, { input }, context: Context) {
  try {
    const newAccount = input

    const data = await context.prisma.account.create({ data: newAccount })
    return { success: true, account: data }
  } catch (error) {
    console.error(error)
    return { success: false, account: null }
  }
}

async function accountUpdate(root: any, { id, input }, context: Context) {
  try {
    const accountData = input

    const data = await context.prisma.account.update({
      where: { id: id },
      data: accountData,
    })
    return { success: true, account: data }
  } catch (error) {
    console.error(error)
    return { success: false, account: null }
  }
}

async function accountDelete(root: any, { id }, context: Context) {
  try {
    await context.prisma.account.delete({
      where: { id: id },
    })
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false }
  }
}

export const ApiAccounts: GqlApi = {
  typeDefs: accountTypeDefs,
  resolvers,
}
