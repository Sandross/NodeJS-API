import { AuthenticationError } from '@/domain/errors'
import { type FacebookAuthentication } from '@/domain/features'
// command pattern aplicado em todos os parâmetros

namespace LoadFacebookUserApi {
  export type Params = {
    token: string
  }
  export type Result = undefined
}

interface LoadFacebookUserApi {
  loadUser: (params: LoadFacebookUserApi.Params) => Promise<LoadFacebookUserApi.Result>
}

class LoadFacebookUserApiSpy implements LoadFacebookUserApi {
  token?: string
  result = undefined
  async loadUser (params: LoadFacebookUserApi.Params): Promise<LoadFacebookUserApi.Result> {
    this.token = params.token
    return this.result
  }
}

class FacebookAuthenticationService {
  constructor (private readonly loadFacebookUserByApi: LoadFacebookUserApi) {}
  async perform (params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    await this.loadFacebookUserByApi.loadUser(params)
    return new AuthenticationError()
  }
}

describe('FacebookAuthenticationService', () => {
  it('should call LoadFacebookUserApi with corret params', async () => {
    const loadFacebookUserByApi = new LoadFacebookUserApiSpy()
    const sut = new FacebookAuthenticationService(loadFacebookUserByApi)
    await sut.perform({ token: 'any_token' })
    expect(loadFacebookUserByApi.token).toBe('any_token')
  })
  it('Should return AuthenticationError when LoadFacebookUserApi returns undefined', async () => {
    const loadFacebookUserByApi = new LoadFacebookUserApiSpy()
    loadFacebookUserByApi.result = undefined
    const sut = new FacebookAuthenticationService(loadFacebookUserByApi)
    const authResult = await sut.perform({ token: 'any_token' })
    expect(authResult).toEqual(new AuthenticationError())
  })
})
