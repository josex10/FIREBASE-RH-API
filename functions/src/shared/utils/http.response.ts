import { Response } from 'express'

export enum HttpStatus {
  OK = 200,
  NOT_FOUND = 404,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  INTERNAL_SERVER_ERROR = 500,
  UNPROCESSABLE_ENTITY = 422
}

export class HttpResponse {
  /**
   *
   * @param res
   * @param data
   * @returns Response
   * @description THIS FUNCTION RETURN THE CORRECT STRUCTURE TO RESPONSE FOR THE CLIENT
   */
  Ok (res: Response, data?: any): Response {
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      statusMsg: 'Success',
      data: data
    })
  }

  /**
   *
   * @param res
   * @param data
   * @returns Response
   * @description THIS FUNCTION RETURN THE CORRECT STRUCTURE TO RESPONSE FOR THE CLIENT
   */
  NotFound (res: Response, data?: any): Response {
    return res.status(HttpStatus.NOT_FOUND).json({
      status: HttpStatus.NOT_FOUND,
      statusMsg: 'Not Found',
      error: data
    })
  }

  /**
   *
   * @param res
   * @param data
   * @returns Response
   * @description THIS FUNCTION RETURN THE CORRECT STRUCTURE TO RESPONSE FOR THE CLIENT
   */
  Unauthorized (res: Response, data?: any): Response {
    return res.status(HttpStatus.UNAUTHORIZED).json({
      status: HttpStatus.UNAUTHORIZED,
      statusMsg: 'Unauthorized',
      error: data
    })
  }

  /**
   *
   * @param res
   * @param data
   * @returns Response
   * @description THIS FUNCTION RETURN THE CORRECT STRUCTURE TO RESPONSE FOR THE CLIENT
   */
  Forbidden (res: Response, data?: any): Response {
    return res.status(HttpStatus.FORBIDDEN).json({
      status: HttpStatus.FORBIDDEN,
      statusMsg: 'Forbidden',
      error: data
    })
  }

  /**
   *
   * @param res
   * @param data
   * @returns Response
   * @description THIS FUNCTION RETURN THE CORRECT STRUCTURE TO RESPONSE FOR THE CLIENT
   */
  Error (res: Response, data?: any): Response {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      statusMsg: 'Internal server error',
      error: data
    })
  }

  /**
   *
   * @param res
   * @param data
   * @returns Response
   * @description THIS FUNCTION RETURN THE CORRECT STRUCTURE TO RESPONSE FOR THE CLIENT
   */
  UnprocessableEntity (res: Response, data?: any): void {
    res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      statusMsg: 'Unprocessable Entity',
      error: data
    })
  }
}
