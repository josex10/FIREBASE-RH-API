import { NextFunction, Request, Response, Router } from 'express'
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
    this.router.get('/role', (req, res): void => {
      this.roleController.findAllRoles(req, res)
    })

    this.router.get('/role/:uid',
      getRoleByIDValidationRules(),
      (req: Request, res: Response, next: NextFunction): void => {
        executeValidator(req, res, next)
      },
      (req: Request, res: Response): void => {
        this.roleController.findRoleById(req, res)
      })

    this.router.post('/role',
      createRoleValidationRules(),
      (req: Request, res: Response, next: NextFunction): void => {
        executeValidator(req, res, next)
      },
      (req: Request, res: Response): void => {
        this.roleController.createRole(req, res)
      })

    this.router.put('/role/:uid', (req, res): void => {
      this.roleController.updateRole(req, res)
    })

    this.router.delete('/role/:uid', (req, res): void => {
      this.roleController.deleteRole(req, res)
    })

    this.router.put('/role/activate/:uid', (req, res): void => {
      this.roleController.activateRole(req, res)
    })
  }
}
