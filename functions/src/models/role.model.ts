import { IBase } from './base.model'

export interface IRole extends Omit<IBase, 'createdBy' | 'editedBy'> {
  description: string
  name: string
}

export interface IRoleUpdate extends Omit<IRole, 'createAt' | 'deleteAt' | 'active'>{}
