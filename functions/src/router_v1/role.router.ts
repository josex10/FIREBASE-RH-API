import { NextFunction, Request, RequestHandler, Response, Router } from 'express'
import { RoleController } from '../controllers/role.controller'
import { createRoleValidationRules, getRoleByIDValidationRules } from '../shared/validators/role.validator'
import { executeValidator } from '../shared/validators/general.validator'

export class RoleRouter {
  public router: Router
  private readonly roleController: RoleController

  constructor (
  ) {
    this.router = Router()
    this.roleController = new RoleController()
    this.routes()
  }

  /**
   * @description ALL THE ROUTES FOR IROLE
   */
  routes (): void {
    this.router.get('/role', (async (req, res) => {
      await this.roleController.findAllRoles(req, res)
    }) as RequestHandler)

    this.router.get('/role/:uid',
      getRoleByIDValidationRules(),
      (req: Request, res: Response, next: NextFunction): void => {
        executeValidator(req, res, next)
      },
      (async (req: Request, res: Response) => {
        await this.roleController.findRoleById(req, res)
      }) as RequestHandler)

    this.router.post('/role',
      createRoleValidationRules(),
      (req: Request, res: Response, next: NextFunction): void => {
        executeValidator(req, res, next)
      },
      (async (req: Request, res: Response) => {
        await this.roleController.createRole(req, res)
      }) as RequestHandler)

    this.router.put('/role/:uid', (async (req, res) => {
      await this.roleController.updateRole(req, res)
    }) as RequestHandler)

    this.router.delete('/role/:uid', (async (req, res) => {
      await this.roleController.deleteRole(req, res)
    }) as RequestHandler)

    this.router.put('/role/activate/:uid', (async (req, res) => {
      await this.roleController.activateRole(req, res)
    }) as RequestHandler)
  }
}
