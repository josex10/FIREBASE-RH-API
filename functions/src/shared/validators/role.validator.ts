
import { body, ValidationChain, CustomValidator } from 'express-validator'
import { RoleController } from '../../controllers/role.controller'
import { checkEmptyStrings } from './general.validator'
import { EValidationMessage } from '../../enums/generic.enums'

/**
 *
 * @returns ValidationChain[]
 * @description THIS FUNCTION ADD ALL THE RULES TO CREATE A NEW ROLE
 */
export const roleValidationRules = (): ValidationChain[] => {
  return [
    body('description')
      .exists().withMessage(EValidationMessage.REQUIRED).bail()
      .isString().withMessage(EValidationMessage.TYPESTRING).bail()
      .custom(checkEmptyStrings).bail()
      .isLength({ min: 5 }).withMessage(EValidationMessage.NOTMINSTRINGLENGTH).bail()
      .isLength({ max: 230 }).withMessage(EValidationMessage.EXCEEDSTRINGLENGTH).bail(),
    body('name')
      .exists().withMessage(EValidationMessage.REQUIRED).bail()
      .isString().withMessage(EValidationMessage.TYPESTRING).bail()
      .custom(checkEmptyStrings).bail()
      .isLength({ min: 5 }).withMessage(EValidationMessage.NOTMINSTRINGLENGTH).bail()
      .isLength({ max: 30 }).withMessage(EValidationMessage.EXCEEDSTRINGLENGTH).bail()
      .custom(isDuplicateRoleName).bail()
  ]
}

/**
 *
 * @param roleName
 * @returns CustomValidator
 * @description THIS IS A CUSTOM VALIDATION FUNCTION TO CHECK IF THE ROLE NAME IS ALREADY INTO THE DB
 */
const isDuplicateRoleName: CustomValidator = (async (roleName: string) => {
  const roleController = new RoleController()

  const response = await roleController.checkDuplicateRoleName(roleName.toUpperCase())
  if (response) {
    return await Promise.reject(new Error(`The role name ${String(roleName)} already exists`))
  }
  return await Promise.resolve()
}) as CustomValidator
