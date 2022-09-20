export interface IBase {
  uid: string
  createAt: Date | null
  updateAt: Date | null
  deleteAt: Date | null
  createdBy: string
  editedBy: string
  active: boolean
}
