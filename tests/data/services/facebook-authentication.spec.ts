import { type FacebookAuthentication } from '@/domain/features'
// command pattern aplicado em todos os parâmetros

namespace LoadFacebookUserApi {
  export type Params = {
    token: string
  }
}

interface LoadFacebookUserApi {
  loadUser: (params: LoadFacebookUserApi.Params) => Promise<void>
}

class LoadFacebookUserApiSpy implements LoadFacebookUserApi {
  token?: string

  async loadUser (params: LoadFacebookUserApi.Params): Promise<void> {
    this.token = params.token
  }
}

class FacebookAuthenticationService {
  constructor (private readonly loadFacebookUserByApi: LoadFacebookUserApi) {}
  async perform (params: FacebookAuthentication.Params): Promise<void> {
    await this.loadFacebookUserByApi.loadUser(params)
  }
}

describe('FacebookAuthenticationService', () => {
  it('should call LoadFacebookUserApi with corret params', async () => {
    const loadFacebookUserByApi = new LoadFacebookUserApiSpy()
    const sut = new FacebookAuthenticationService(loadFacebookUserByApi)
    await sut.perform({ token: 'any_token' })
    expect(loadFacebookUserByApi.token).toBe('any_token')
  })
})
