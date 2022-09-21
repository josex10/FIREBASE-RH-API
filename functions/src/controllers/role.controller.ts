import { Request, Response } from 'express'
import { HttpResponse } from '../shared/utils/http.response'
import { RoleService } from '../services/role.service'
import { IRole, IRoleUpdate } from '../models/role.model'
import { mapEditorData, setTypeToStoreOnDB } from '../shared/helpers/role.helper'
import { EExecutionType, EValidationMessage } from '../enums/generic.enums'

export class RoleController {
  constructor (
    private readonly roleService: RoleService = new RoleService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  /**
   *
   * @param _req
   * @param res
   * @returns IRoles[]
   * @description THIS FUNCTION GET ALL ROLES FROM THE API
   */
  async findAllRoles (_req: Request, res: Response): Promise<Response> {
    try {
      // GET THE DATA FROM THE DB (SERVICE)
      const dbResponse = await this.roleService.findAllRoles()

      // CHECK IF SOME DATA WAS RETURNED FROM THE DB
      if (dbResponse.empty) {
        this.httpResponse.NotFound(res, EValidationMessage.NODOCUMENTS)
      }

      // CALL THE HELPER TO CONVERT THE DATA INTO THE CORRECT INTERFACE
      const listOfRoles: IRole[] = dbResponse.docs.map((role) => { return mapEditorData(role) })

      // SEND THE RESPONSE TO THE CLIENT
      return this.httpResponse.Ok(res, listOfRoles)
    } catch (e) {
      console.error(e)
      return this.httpResponse.Error(res, e)
    }
  }

  /**
   *
   * @param req
   * @param res
   * @returns IRole
   * @Description THIS FUNCTION GET A ROLE FROM THE DB BY ID
   */
  async findRoleById (req: Request, res: Response): Promise<Response> {
    try {
      // GET THE UID FROM THE URL
      const { uid } = req.params

      // GET THE DATA FROM THE DB (SERVICE)
      const dbResponse = await this.roleService.findRoleById(uid)

      // CHECK IF SOME DATA WAS RETURNED FROM THE DB
      if (!dbResponse.exists) {
        return this.httpResponse.NotFound(res, EValidationMessage.NODOCUMENTS)
      }

      // CALL THE HELPER TO CONVERT THE DATA INTO THE CORRECT INTERFACE
      const singleRole: IRole = mapEditorData(dbResponse)

      // SEND THE RESPONSE TO THE CLIENT
      return this.httpResponse.Ok(res, singleRole)
    } catch (e) {
      console.error(e)
      return this.httpResponse.Error(res, e)
    }
  }

  /**
   *
   * @param req
   * @param res
   * @returns IRole.uid
   * @description THIS FUNCTION INSERT A NEW ROLE INTO THE DB
   */
  async createRole (req: Request, res: Response): Promise<Response> {
    try {
      // GET THE DATA FROM THE BODY
      const { description, name } = req.body

      // SET THE DATA FOR THE NEW ROLE
      const role: IRole = setTypeToStoreOnDB(EExecutionType.CREATE, name, description) as IRole

      // GET THE DATA FROM THE DB (SERVICE)
      const dbResponse = await this.roleService.createRole(role)

      // SEND THE RESPONSE TO THE CLIENT
      return this.httpResponse.Ok(res, dbResponse.id)
    } catch (e) {
      console.error(e)
      return this.httpResponse.Error(res, e)
    }
  }

  /**
   *
   * @param req
   * @param res
   * @returns Firestore.WriteResult
   * @description THIS FUNCTION UPDATE THE ROLE ON THE DB
   */
  async updateRole (req: Request, res: Response): Promise<Response> {
    try {
      // GET THE DATA FROM THE BODY
      const { description, name } = req.body

      // GET THE ID FROM THE URL
      const { uid } = req.params

      // SET THE DATA FOR THE NEW ROLE
      const tmpRole: IRoleUpdate = setTypeToStoreOnDB(EExecutionType.UPDATE, name, description, uid) as IRoleUpdate

      // GET THE DATA FROM THE DB (SERVICE)
      const dbResponse = await this.roleService.updateRole(tmpRole)

      // SEND THE RESPONSE TO THE CLIENT
      return this.httpResponse.Ok(res, dbResponse)
    } catch (e) {
      console.error(e)
      return this.httpResponse.Error(res, e)
    }
  }

  /**
   *
   * @param req
   * @param res
   * @returns Firestore.WriteResult
   * @description THIS FUNCTION EDIT ONLY THE OPTION ACTIVE TO FALSE FOR THE ROLE ON THE DB
   */
  async deleteRole (req: Request, res: Response): Promise<Response> {
    try {
      // GET THE ID FROM THE URL
      const { uid } = req.params

      // GET THE DATA FROM THE DB (SERVICE)
      const dbResponse = await this.roleService.deleteRole(uid)

      // SEND THE RESPONSE TO THE CLIENT
      return this.httpResponse.Ok(res, dbResponse)
    } catch (e) {
      console.error(e)
      return this.httpResponse.Error(res, e)
    }
  }

  /**
   *
   * @param req
   * @param res
   * @returns Firestore.WriteResult
   * @description THIS FUNCTION EDIT ONLY THE OPTION ACTIVE TO TRUE FOR THE ROLE ON THE DB
   */
  async activateRole (req: Request, res: Response): Promise<Response> {
    try {
      // GET THE ID FROM THE URL
      const { uid } = req.params

      // GET THE DATA FROM THE DB (SERVICE)
      const dbResponse = await this.roleService.activateRole(uid)

      // SEND THE RESPONSE TO THE CLIENT
      return this.httpResponse.Ok(res, dbResponse)
    } catch (e) {
      console.error(e)
      return this.httpResponse.Error(res, e)
    }
  }

  /**
   *
   * @param roleName
   * @returns Boolean IF THE NAME EXIST RETURN TRUE
   * @desdescription CHECK THE ROLE NAME TO AVOID DUPLICATE NAMES
   */
  async checkDuplicateRoleName (roleName: string): Promise<boolean> {
    // GET THE DATA FROM THE DB (SERVICE)
    const dbResponse = await this.roleService.findRoleByName(roleName)

    // CHECK IF SOME DATA WAS RETURNED FROM THE DB
    if (dbResponse.empty) {
      // RETURN THAT THE NAME IS NOT DUPLICATED
      return false
    }

    // RETURN THAT THE NAME IS DUPLICATED
    return true
  }
}
