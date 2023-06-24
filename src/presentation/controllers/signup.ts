import { badRequest } from './../helpers/http-helper'
import { type HttpResponse, type HttpRequest } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError('name'))
    }
    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError('email'))
    } else {
      return {
        statusCode: 200,
        body: 'Success'
      }
    }
  }
}
