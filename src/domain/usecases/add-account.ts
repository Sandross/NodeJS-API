import { type AccountModel } from '../models/account'
// model accountModel é mais genérico, por isso fica em models

export interface AddAccountModel {
  name: string
  email: string
  password: string
}

export interface AddAccount {
  add: (account: AddAccountModel) => AccountModel
}
