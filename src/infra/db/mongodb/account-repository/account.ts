import { type AddAccountRepository } from '@/data/protocols/add-account-repository'
import { type AddAccountModel } from '@/domain/usecases/add-account'
import { type AccountModel } from '@/domain/models/account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel | any): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const insertedId = result.insertedId
    const account = Object.assign({}, accountData, { id: insertedId.toString() })
    return MongoHelper.map(account)
  }
}
