
import { IRole, IRoleUpdate } from '../../models/role.model'
import { UConvertDateSecondsToDateObject } from '../utils/date.util'
import { EExecutionType } from '../../enums/generic.enums'

/**
 *
 * @param role
 * @returns IRole
 * @description ON FIREBASE THE RETURN RESPONSE DOESN'T ADD THE ID THIS FUNCTION RETURN A COMPLETE IROLE OBJECT
 */
export const mapEditorData = (role: any): IRole => {
  const rolSchema: IRole = {
    uid: role.id,
    createAt: role.data().createAt ? UConvertDateSecondsToDateObject(role.data().createAt._seconds) : null,
    updateAt: role.data().updateAt ? UConvertDateSecondsToDateObject(role.data().updateAt._seconds) : null,
    deleteAt: role.data().deleteAt ? UConvertDateSecondsToDateObject(role.data().deleteAt._seconds) : null,
    active: role.data().active,
    description: role.data().description,
    name: role.data().name
  }
  return rolSchema
}

/**
 *
 * @param execType
 * @param name
 * @param description
 * @param uid
 * @returns IRole | IRoleUpdate
 * @description THIS FUNCTION SET THE CORRECT DATA BASED ON THE EXECUTION TYPE
 */
export const setTypeToStoreOnDB = (execType: EExecutionType, name: string, description: string, uid: string = ''): IRole | IRoleUpdate => {
  description = description.toUpperCase()
  name = name.toUpperCase()

  if (execType === EExecutionType.CREATE) {
    const role: IRole = {
      uid,
      createAt: new Date(),
      updateAt: null,
      deleteAt: null,
      active: true,
      description,
      name
    }
    return role
  } else {
    const role: IRoleUpdate = {
      uid,
      description,
      name,
      updateAt: new Date()
    }
    return role
  }
}
