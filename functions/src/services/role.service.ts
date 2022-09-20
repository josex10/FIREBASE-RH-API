import { db } from '../db/connection'
import * as admin from 'firebase-admin'
import { IRole, IRoleUpdate } from '../models/role.model'
import { EDataBaseCollectionName } from '../enums/generic.enums'

export class RoleService {

 
  /**
   * 
   * @returns firestore.QuerySnapshot
   */
  async findAllRoles (): Promise<admin.firestore.QuerySnapshot> {
    return await db
      .collection(EDataBaseCollectionName.ROLE)
      .get()
  }

  /**
   * 
   * @returns firestore.DocumentSnapshot
   */
  async findRoleById (uid: string): Promise<admin.firestore.DocumentSnapshot> {
    return await db
      .collection(EDataBaseCollectionName.ROLE)
      .doc(uid)
      .get()
  }


  /**
   * 
   * @returns firestore.DocumentReference
   */
  async createRole (role: IRole): Promise<admin.firestore.DocumentReference> {
    return await db
      .collection(EDataBaseCollectionName.ROLE)
      .add(role)
  }

  /**
   * 
   * @returns firestore.WriteResult
   */
  async updateRole (role: IRoleUpdate): Promise<admin.firestore.WriteResult> {
    return await db
      .collection(EDataBaseCollectionName.ROLE)
      .doc(role.uid)
      .update(role)
  }

  /**
   * 
   * @returns firestore.WriteResult
   */
  async deleteRole (uid: string): Promise<admin.firestore.WriteResult> {
    return await db
      .collection(EDataBaseCollectionName.ROLE)
      .doc(uid)
      .update({ active: false, deleteAt: new Date() })
  }

  /**
   * 
   * @returns firestore.WriteResult
   */
  async activateRole (uid: string): Promise<admin.firestore.WriteResult> {
    return await db
      .collection(EDataBaseCollectionName.ROLE)
      .doc(uid)
      .update({ active: true, deleteAt: null })
  }

  /**
   * 
   * @returns firestore.QuerySnapshot
   */
  async findRoleByName (roleName: string): Promise<admin.firestore.QuerySnapshot> {
    return await db
      .collection(EDataBaseCollectionName.ROLE)
      .where('name', '==', roleName)
      .get()
  }
}
