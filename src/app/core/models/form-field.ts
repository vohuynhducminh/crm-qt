import { environment } from 'src/environments/environment';

class ServerValidator {
  Name: string;
  Validator: any;
  Message: string;
}

export class FormField {
  Order?: number;
  Label?: string;
  SubLabel?: string;
  Name?: string;
  Placeholder?: string;
  Class?: string[];
  DateFormat?: string;
  InputType?: string;
  InputMask?: any;
  Options?: string[];
  Type: string;
  Value?: any;
  GlobalVariableId?: string;
  WorkFlowHistoryId?: string;
  FileConfig?: FileConfig;
  Validations?: ServerValidator[];
  FieldType?: string;
  IsCurrent?: boolean;
  SelectMultiple?: boolean;

  public static buildUrl(formField: FormField) {
    if (formField.FileConfig) {
      if (formField.FileConfig.FileType.includes('read')) {
        if (formField.FileConfig.FileList) {
          formField.FileConfig.FileList.forEach(
            e => {
              e.DownloadUrl = `${environment.endPoint}${environment.apiPaths.globalVariableValue.get}${e.Id}${environment.apiPaths.globalVariableValue.downloadFile}`;
              e.DeleteUrl = `${environment.endPoint}${environment.apiPaths.globalVariableValue.deleteFile}${e.Id}`;
            }
          );
        }
        if (formField.FileConfig.FileType.includes('write')) {
          if (formField.GlobalVariableId) {
            formField.FileConfig.UploadUrl = `${environment.endPoint}${environment.apiPaths.globalVariableValue.postFiles}?globalVariableId=${formField.GlobalVariableId}&customerWorkflowId=${formField.WorkFlowHistoryId}`;
          }
        }
      }
    }
  }
}

export class FileConfig {
  FileType?: string; //  'write' 'read'
  Multiple = false;
  UploadUrl?: string;
  FileList?: FileVM[];
}

export class FileVM {
  Id?: string;
  Name?: string;
  Date?: string;
  DownloadUrl?: string;
  DeleteUrl?: string;
}

export class FormFieldCM {
  Type: string;
  Label?: string;
  InputType?: string;
  Name?: string;
  Validations?: ServerValidator[];
  Order?: number;
}
