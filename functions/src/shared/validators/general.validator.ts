import { CustomValidator, param, ValidationChain, validationResult } from 'express-validator'
import { EValidationMessage } from '../../enums/generic.enums'
import { HttpResponse } from '../utils/http.response'
import { NextFunction, Request, Response } from 'express'

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns Response
 * @description THIS FUNCTION EXECUTE ALL THE RULES VALIDATION AND RESPONSE THE CORRECT MESSAGE TO THE CLIENT IN CASE OF ERROR
 */
export const executeValidator = (req: Request, res: Response, next: NextFunction): void => {
  const httpResponse = new HttpResponse()
  const errors = validationResult(req)
  try {
    if (!errors.isEmpty()) {
      errors.throw()
    }
    return next()
  } catch (e) {
    console.log(e)
    httpResponse.UnprocessableEntity(res, errors.array({ onlyFirstError: true })[0])
  }
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

/**
 *
 * @returns ValidationChain[]
 * @description THIS FUNCTION ADD ALL THE RULES TO GET A ROLE BY ID
 */
 export const uidValidationRules = (): ValidationChain[] => {
  return [
    param('uid')
      .exists().withMessage(EValidationMessage.REQUIRED).bail()
      .isString().withMessage(EValidationMessage.TYPESTRING).bail()
      .custom(checkEmptyStrings).bail()
  ]
}
