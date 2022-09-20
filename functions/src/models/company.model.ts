import { IBase } from './base.model'
import { ILicense } from './license.model'

export interface ICompany extends Omit<IBase, 'createdBy' | 'editedBy'> {
  tax_number: string
  name: string
  phone: string
  country: string
  province: string
  address: string
  zip: number
  _license: ILicense
  valid_license: boolean
}
