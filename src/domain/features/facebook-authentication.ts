// 1 service implementa 1 useCase
import { type AccessToken } from '@/domain/models'
import { type AuthenticationError } from '@/domain/errors'

export interface FacebookAuthentication {
  perform: (Params: FacebookAuthentication.Params) => Promise<FacebookAuthentication.Result>
}

export namespace FacebookAuthentication {
  export type Params = {
    token: string
  }

  export type Result = AccessToken | AuthenticationError
}
