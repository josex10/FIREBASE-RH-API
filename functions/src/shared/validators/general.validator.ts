import { CustomValidator } from 'express-validator'
import { EValidationMessage } from '../../enums/generic.enums'
import { HttpResponse } from '../utils/http.response'
import { validationResult } from 'express-validator'
import { NextFunction, Request, Response } from 'express'

/**
 * 
 * @param req 
 * @param res 
 * @param next 
 * @returns Response
 * @description THIS FUNCTION EXECUTE ALL THE RULES VALIDATION AND RESPONSE THE CORRECT MESSAGE TO THE CLIENT IN CASE OF ERROR
 */
export const executeValidator = (req: Request, res: Response, next: NextFunction): Response | void => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }

  const httpResponse = new HttpResponse()
  return httpResponse.UnprocessableEntity(res, errors.array({ onlyFirstError: true })[0])
}

/**
 * 
 * @param string 
 * @returns Promise
 * @description THIS FUNCTION REMOVE ALL THE BLANK SPACES OF THE STRINGS TO CHECK IF THE STRING HAS DATA
 */
export const checkEmptyStrings: CustomValidator = async string => {
  const trimString = string.trim()

  if (trimString.length === 0) {
    return await Promise.reject(EValidationMessage.EMPTYSTRING)
  }

  return await Promise.resolve()
}
