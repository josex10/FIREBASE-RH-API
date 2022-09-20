import { IBase } from './base.model'

export interface ILicense extends Omit<IBase, 'createdBy' | 'editedBy'> {
  description: string
  price: number
  recurrency: string
}
