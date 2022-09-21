
/**
 * @description ENUMS OF THE COLLECTIONS NAMES INTO THE DB
 */
export enum EDataBaseCollectionName {
  ROLE = 'ROLE'
}

/**
 * @description ENUMS USED TO RUN DIFFERENTS PROCESS DEPENDS OF THE EXEC TYPE
 */
export enum EExecutionType {
  UPDATE = 'UPDATE',
  CREATE = 'CREATE'
}

/**
 * @description ENUMS USED FOR MESSAGE WHEN THE DATA IS VALIDATED
 */
export enum EValidationMessage {
  REQUIRED = 'The parameter is required.',
  TYPESTRING = 'The parameter name should be a string type.',
  EMPTYSTRING = 'The para parameter cannot be empty.',
  INCORRECTUUID = 'The paramater is an incorrect ID.',
  NODOCUMENTS = 'No documents',
  NOTMINSTRINGLENGTH = 'The parameter does not have the minimum length required.',
  EXCEEDSTRINGLENGTH = 'The parameter has exceeded required length.'
}
