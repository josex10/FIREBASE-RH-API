
import { body, ValidationChain, CustomValidator, param } from 'express-validator'
import { RoleController } from '../../controllers/role.controller'
import { checkEmptyStrings } from './general.validator'
import { EValidationMessage } from '../../enums/generic.enums'

/**
 *
 * @returns ValidationChain[]
 * @description THIS FUNCTION ADD ALL THE RULES TO CREATE A NEW ROLE
 */
export const createRoleValidationRules = (): ValidationChain[] => {
  return [
    body('description')
      .exists().withMessage(EValidationMessage.REQUIRED).bail()
      .isString().withMessage(EValidationMessage.TYPESTRING).bail()
      .custom(checkEmptyStrings).bail(),
    body('name')
      .exists().withMessage(EValidationMessage.REQUIRED).bail()
      .isString().withMessage(EValidationMessage.TYPESTRING).bail()
      .custom(checkEmptyStrings).bail()
      .custom(isDuplicateRoleName).bail()
  ]
}

/**
 *
 * @returns ValidationChain[]
 * @description THIS FUNCTION ADD ALL THE RULES TO GET A ROLE BY ID
 */
export const getRoleByIDValidationRules = (): ValidationChain[] => {
  return [
    param('uid')
      .exists().withMessage(EValidationMessage.REQUIRED).bail()
      .isString().withMessage(EValidationMessage.TYPESTRING).bail()
      .custom(checkEmptyStrings).bail()
  ]
}

/**
 *
 * @param roleName
 * @returns CustomValidator
 * @description THIS IS A CUSTOM VALIDATION FUNCTION TO CHECK IF THE ROLE NAME IS ALREADY INTO THE DB
 */
const isDuplicateRoleName: CustomValidator = async roleName => {
  const roleController = new RoleController()

  const response = await roleController.checkDuplicateRoleName(roleName)

  if (response) {
    return await Promise.reject(new Error(`The role name ${roleName} already exists`))
  }
  return await Promise.resolve()
}
