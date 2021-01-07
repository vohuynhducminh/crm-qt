// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import * as moment from 'moment';
import { Observable } from 'rxjs';

export const environment = {
  production: false,
  token: 'CRM_TOKEN',
  endPoint: 'http://crmbe.hisoft.vn/',
  // endPoint: 'https://apicrm.qtsc.com.vn/',
  // endPoint: 'http://localhost:44319/',
  post(path: string, body: any, options?: any): Observable<any> {
    return this.http
      .post(`${this.endPoint}/${path}`, body, options);
  },

  typeFormat: {
    FULL_DATE: [
      {
        label: 'Ngày ... tháng ... năm ...',
        value: '[Ngày] DD [tháng] MM [năm] YYYY',
      },
      {
        label: 'ngày ... tháng ... năm ...',
        value: '[ngày] DD [tháng] MM [năm] YYYY',
      },
      {
        label: '..../..../....',
        value: 'DD/MM/YYYY',
      },
    ],
    INPUT_MASK: [
      {
        label: 'Chỉ phân cách phần nghìn',
        value: 'thousandOnlyMask',
      },
      // {
      //   label: 'Dạng số điện thoại (070-4432-429)',
      //   value: 'tel',
      // },
      {
        label: 'Phân cách phần nghìn và thập phân',
        value: 'thousandWithDecMask',
      },
    ],
    INPUT_TYPE: [
      'email', 'hidden',
      'number', 'text',
    ],
    TYPE: [
      'input', 'button', 'select', 'date', 'time',
      'radiobutton', 'checkbox', 'textarea', 'file', 'select-customer', 'select-individual',
    ],
    CLASS_LIST: [
      {
        value: 'col-1',
        label: '1/12',
      },
      {
        value: 'col-2',
        label: '2/12',
      },
      {
        value: 'col-3',
        label: '3/12',
      },
      {
        value: 'col-4',
        label: '4/12',
      },
      {
        value: 'col-5',
        label: '5/12',
      },
      {
        value: 'col-6',
        label: '6/12',
      },
      {
        value: 'col-7',
        label: '7/12',
      },
      {
        value: 'col-8',
        label: '8/12',
      },
      {
        value: 'col-9',
        label: '9/12',
      },
      {
        value: 'col-10',
        label: '10/12',
      },
      {
        value: 'col-11',
        label: '11/12',
      },
      {
        value: 'col-12',
        label: '12/12',
      },
    ],
  },
  apiPaths: {
    workFlow: {
      get: 'api/HsWorkFlow/',
      post: 'api/HsWorkFlow/',
      put: 'api/HsWorkFlow/',
      delete: 'api/HsWorkFlow/',
      getForm: '/Form/',
    },
    workFlowInstance: {
      get: 'api/HsWorkFlowInstance/',
      post: 'api/HsWorkFlowInstance/',
      put: 'api/HsWorkFlowInstance/',
      delete: 'api/HsWorkFlowInstance/',
      getByWorkFlowId: 'api/HsWorkFlowInstance/GetByWorkFlowId/',
      setForm: '/form/',
    },
    workFlowConnection: {
      get: 'api/HsWorkFlowConnection/',
      post: 'api/HsWorkFlowConnection/',
      put: 'api/HsWorkFlowConnection/',
      delete: 'api/HsWorkFlowConnection/',
      getByFromInstanceId: 'api/HsWorkFlowConnection/GetWorkFlowConnectionByFromInstanceId/',
      getByToInstanceId: 'api/HsWorkFlowConnection/GetWorkFlowConnectionByToInstanceId/',
    },
    globalVariable: {
      get: 'api/GlobalVariable/GetByWorkFlowId/',
      post: 'api/GlobalVariable',
    },
    account_role: {
      main: 'api/AccountRole',
      get: 'api/AccountRole/',
    },
    account: {
      main: 'api/Accounts',
      get: 'api/Accounts/',
    },
    user: {
      get: 'api/User/',
      post: 'api/User/',
      put: 'api/User/',
      delete: 'api/User/',
    },
    group: {
      get: 'api/Group/',
      post: 'api/Group/',
      put: 'api/Group/',
      delete: 'api/Group/',
    },
    role: {
      get: 'api/Role/',
      post: 'api/Role/',
      put: 'api/Role/',
      delete: 'api/Role/',
    },
    permission: {
      get: 'api/Permission/',
      post: 'api/Permission/',
      put: 'api/Permission/',
      delete: 'api/Permission/',
    },
    permissionOfRole: {
      get: 'api/PermissionOfRole/',
      post: 'api/PermissionOfRole/',
      put: 'api/PermissionOfRole/',
      delete: 'api/PermissionOfRole/',
      getByRoleId: 'api/PermissionOfRole/GetByRoleId/',
    },
    roleOfGroup: {
      get: 'api/RoleOfGroup/',
      post: 'api/RoleOfGroup/',
      put: 'api/RoleOfGroup/',
      delete: 'api/RoleOfGroup/',
      getByGroupId: 'api/RoleOfGroup/GetByGroupId/',
    },
    roleOfUser: {
      get: 'api/RoleOfUser/',
      post: 'api/RoleOfUser/',
      put: 'api/RoleOfUser/',
      delete: 'api/RoleOfUser/',
      getByUserId: 'api/RoleOfUser/GetByUserId/',
    },
    groupUser: {
      get: 'api/GroupUser/',
      post: 'api/GroupUser/',
      put: 'api/GroupUser/',
      delete: 'api/GroupUser/',
      getByGroupId: 'api/GroupUser/GetByGroupId/',
      getByUserId: 'api/GroupUser/GetByUserId/',
    },
    customer: {
      get: 'api/Customers/',
      post: 'api/Customers/',
      put: 'api/Customers/',
      delete: 'api/Customers/',
      getCustomerById: 'api/Customers/',
      photo: 'photo/',
      contact: '/Contacts/',
      paging: 'Paging/',
      getByListId: 'GetList/',
    },
    customerWorkFlow: {
      get: 'api/CustomerWorkFlows/',
      post: 'api/CustomerWorkFlows/',
      getByCustomerId: 'api/CustomerWorkFlows/GetByCustomer/',
      getByWorkFlowId: 'api/CustomerWorkFlows/GetByWorkFlow/',
      isInWorkflow: 'api/CustomerWorkFlows/IsInWorkflow/',
      getFiles: 'Files',
    },
    workFlowHistory: {
      get: 'api/WorkFlowHistories/',
      getForm: 'api/WorkFlowHistories/form',
      postForm: 'api/WorkFlowHistories/form',
      getFiles: 'api/WorkFlowHistories/files',
      postFiles: 'api/WorkFlowHistories/files',
      getTemplates: 'api/WorkFlowHistories/templates',
      downloadFile: 'api/WorkFlowHistories/files/',
    },
    route: {
      get: 'api/Route/',
      post: 'api/Route/',
    },
    form: {
      get: 'api/Form/',
      post: 'api/Form/',
      put: 'api/Form/',
      delete: 'api/Form/',
      getFormGroups: '/FormGroups/',
    },
    template: {
      get: 'api/HsTemplate/',
      post: 'api/HsTemplate/',
      put: 'api/HsTemplate/',
      delete: 'api/HsTemplate/',
      addForm: 'FormId/',
    },
    auth: {
      login: 'api/Auth/login',
      permissions: 'api/Auth/Permissions',
      information: 'api/Auth/info',
    },
    category: {
      get: 'api/Categories/',
      post: 'api/Categories/',
      put: 'api/Categories/',
      delete: 'api/Categories/',
      getProducts: 'api/Categories/',
      addProducts: 'api/Categories/AddProducts/',
    },
    product: {
      get: 'api/Products/',
      post: 'api/Products/',
      put: 'api/Products/',
      delete: 'api/Products/',
      getCategories: 'api/Products/',
      addCategories: 'api/Products/AddCategories/',
    },
    productCategory: {
      delete: 'api/ProductCategory/',
    },
    notification: {
      centerHub: 'centerHub',
      get: 'api/Notification/',
      post: 'api/Notification/',
      put: 'api/Notification/',
      toggleSeen: 'ToggleSeen/',
    },
    globalVariableValue: {
      get: 'api/GlobalVariableValue/',
      postFiles: 'api/GlobalVariableValue/files',
      downloadFile: '/file',
      deleteFile: 'api/GlobalVariableValue/',
    },
    eventLog: {
      get: 'api/EventLog/',
      post: 'api/EventLog/',
      put: 'api/EventLog/',
      delete: 'api/EventLog/',
      getByWorkFlowHistoryId: 'GetByWorkFlowHistoryId/',
    },
    eventLogFile: {
      get: 'api/EventLogFile/',
      post: 'api/EventLogFile/',
      delete: 'api/EventLogFile/',
      getByEventLogId: 'GetByEventLogId/',
      file: 'File/',
    },
    mail: {
      post: 'api/Mail/',
    },
    contract: {
      get: 'api/Contract/',
      post: 'api/Contract/',
      annex: '/Appendix',
    },
    contract_cooperation: {
      main: 'api/CooperationContract',
      service: 'CooperationContractService',
      file: 'File',
      close: 'Close',
    },
    contract_cooperation_telecom_service: {
      main: 'api/CooperationContract',
    },
    contract_cooperation_sub: {
      main: 'api/SubCoContract',
    },
    contract_vt: {
      get: 'api/ContractTelecom/',
      post: 'api/ContractTelecom',
    },
    telecom_service: {
      get: 'api/Telecomservice/',
      post: 'api/Telecomservice',
    },
    telecom_service_parameter: {
      get: 'api/TelecomserviceParameter/',
      post: 'api/TelecomserviceParameter',
    },
    common_telecom_service: {
      get: 'api/CommonTelecomService/',
      post: 'api/CommonTelecomService',
    },
    revenue: {
      calculateRevenueStatistics: 'api/Revenue/CalculateRevenueStatistics',
      get: 'api/Revenue/Recode',
      getVt: 'api/Revenue/Vt',
      getVtDetail: 'api/Revenue/Vt/',
      detail: '/Detail',
    },
    contract_annex: {
      get: 'api/ContractAppendixes/',
      post: 'api/ContractAppendixes',
      payOff: '/PayOff',
    },
    contract_vt_annex: {
      get: 'api/ContractTelecomAppendix/',
      post: 'api/ContractTelecomAppendix/',
      // update: '/DateAccept',
    },
    statistic: {
      get: 'api/CustomerType',
    },
    dashboard: {
      get: 'api/Dashboard/',
      totalInvestors: 'TotalInvestors',
      vondautuInvestors: 'VondautuInvestors',
      vondautuSoftwares: 'VondautuSoftwares',
      totalSoftwares: 'TotalSoftwares',
      totalPeoples: 'TotalPeoples',
      topRevenue: 'TopRevenue',
      topIncome: 'TopIncome',
      objectType: 'ObjectType',
      marketType: 'MarketType',
      participantsInMonth: 'ParticipantsInMonth',
      contractExpire: 'ContractExpire',
      contractAdjustment: 'ContractAdjustment',
      contractLiquidated: 'ContractLiquidated',
      totalInsideOutsideSoftwares: 'TotalInsideOutsideSoftwares',
      getCompleteRate: 'GetCompleteRate',
      proportionOfTelecommunicationRevenue: 'ProportionOfTelecommunicationRevenue',
      proportionOfParentTelecommunicationRevenue: 'ProportionOfParentTelecommunicationRevenue',
      proportionOfTelecommunicationRevenueInsideOutside: 'ProportionOfTelecommunicationRevenueInsideOutside',
      increaseOutsideRate: 'IncreaseOutsideRate',
      increaseRate: 'IncreaseRate',
      buildingInventory: 'BuildingInventory',
      companyStatisticsInQTSC: 'CompanyStatisticsInQTSC',
    },
    accounts: {
      post: 'api/Accounts/',
      put: 'api/Accounts/',
      permissions: 'Permissions',
    },
    careHistory: {
      get: '/CareHistories/',
      post: '/CareHistories/',
      put: '/CareHistories/',
      delete: '/CareHistories/',
    },
    contact: {
      get: 'api/Contact/',
      getAll: 'api/Contact/All/',
      getByListId: 'GetList/',
    },
  },

  access_roles: [
    {
      'name': 'QT.HĐTV',
      'data': {
        'dashboard': {
          'cvpmqt': {
            'show': true,
          },
          'vpct': {
            'show': true,
          },
          'dvvt': {
            'show': true,
          },
        },
        'customer': {
          'show': true,
          'create': true,
          'update': true,
          'delete': true,
          'employee': true,
          'teacher': true,
          'student': true,//Sinh Vien
          'trainee': true,//Hoc Vien
          'revenue': true
        },
        'workflow': {
          'process': {
            'show': true,
            'create': false,
            'next': false,
          },
          'setting': {
            'show': false,
          },
          'form': {
            'show': false,
          },
        },
        'business': {
          'contract': {
            'show': true,
            'create': false,
            'end': false,
          },
          'revenue': {
            'show': true,
          },
        },
        'telecom': {
          'contract': {
            'show': true,
            'create': false,
            'update': false,
            'end': false,
          },
          'contract-cooperation': {
            'show': true,
            'create': false,
            'update': false,
            'end': false,
          },
          'revenue': {
            'show': true,
          },

        },
        'security': {
          'group': {
            'show': false,
          },
          'user': {
            'show': false,
          },
          'role': {
            'show': false,
          },
          'permission': {
            'show': false,
          },
        },
        'service': {
          'show': false,
        },
        'account': {
          'show': false,
        },
      },
    },
    {
      'name': 'QT.GĐ',
      'data': {
        'dashboard': {
          'cvpmqt': {
            'show': true,
          },
          'vpct': {
            'show': true,
          },
          'dvvt': {
            'show': true,
          },
        },
        'customer': {
          'show': true,
          'create': true,
          'update': true,
          'delete': true,
          'employee': true,
          'teacher': true,
          'student': true,//Sinh Vien
          'trainee': true,//Hoc Vien
          'revenue': true
        },
        'workflow': {
          'process': {
            'show': true,
            'create': false,
            'next': false,
          },
          'setting': {
            'show': false,
          },
          'form': {
            'show': false,
          },
        },
        'business': {
          'contract': {
            'show': true,
            'create': false,
            'end': false,
          },
          'revenue': {
            'show': true,
          },
        },
        'telecom': {
          'contract': {
            'show': true,
            'create': false,
            'update': false,
            'end': false,
          },
          'contract-cooperation': {
            'show': true,
            'create': false,
            'update': false,
            'end': false,
          },
          'revenue': {
            'show': true,
          },

        },
        'security': {
          'group': {
            'show': false,
          },
          'user': {
            'show': false,
          },
          'role': {
            'show': false,
          },
          'permission': {
            'show': false,
          },
        },
        'service': {
          'show': false,
        },
        'account': {
          'show': false,
        },
      },
    },
    {
      'name': 'QT.PGĐ.KD',
      'data': {
        'dashboard': {
          'cvpmqt': {
            'show': true,
          },
          'vpct': {
            'show': true,
          },
          'dvvt': {
            'show': true,
          },
        },
        'customer': {
          'show': true,
          'create': true,
          'update': true,
          'delete': true,
          'employee': true,
          'teacher': true,
          'student': true,
          'trainee': true,
          'revenue': true
        },
        'workflow': {
          'process': {
            'show': true,
            'create': false,
            'next': false,
          },
          'setting': {
            'show': false,
          },
          'form': {
            'show': false,
          },
        },
        'business': {
          'contract': {
            'show': true,
            'create': false,
            'end': false,
          },
          'revenue': {
            'show': true,
          },
        },
        'telecom': {
          'contract': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'contract-cooperation': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },

        },
        'security': {
          'group': {
            'show': false,
          },
          'user': {
            'show': false,
          },
          'role': {
            'show': false,
          },
          'permission': {
            'show': false,
          },
        },
        'service': {
          'show': false,
        },
        'account': {
          'show': false,
        },
      },
    },
    {
      'name': 'QT.PGĐ.TC',
      'data': {
        'dashboard': {
          'cvpmqt': {
            'show': true,
          },
          'vpct': {
            'show': true,
          },
          'dvvt': {
            'show': true,
          },
        },
        'customer': {
          'show': true,
          'create': true,
          'update': true,
          'delete': true,
          'employee': true,
          'teacher': true,
          'student': true,//Sinh Vien
          'trainee': true,//Hoc Vien
          'revenue': true
        },
        'workflow': {
          'process': {
            'show': true,
            'create': false,
            'next': false,
          },
          'setting': {
            'show': false,
          },
          'form': {
            'show': false,
          },
        },
        'business': {
          'contract': {
            'show': false,
            'create': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },
        },
        'telecom': {
          'contract': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'contract-cooperation': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },

        },
        'security': {
          'group': {
            'show': false,
          },
          'user': {
            'show': false,
          },
          'role': {
            'show': false,
          },
          'permission': {
            'show': false,
          },
        },
        'service': {
          'show': false,
        },
        'account': {
          'show': false,
        },
      },
    },
    {
      'name': 'QT.PGĐ.NC',
      'data': {
        'dashboard': {
          'cvpmqt': {
            'show': true,
          },
          'vpct': {
            'show': true,
          },
          'dvvt': {
            'show': true,
          },
        },
        'customer': {
          'show': true,
          'create': true,
          'update': true,
          'delete': true,
          'employee': true,
          'teacher': true,
          'student': true,//Sinh Vien
          'trainee': true,//Hoc Vien
          'revenue': true
        },
        'workflow': {
          'process': {
            'show': true,
            'create': false,
            'next': false,
          },
          'setting': {
            'show': false,
          },
          'form': {
            'show': false,
          },
        },
        'business': {
          'contract': {
            'show': false,
            'create': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },
        },
        'telecom': {
          'contract': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'contract-cooperation': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },

        },
        'security': {
          'group': {
            'show': false,
          },
          'user': {
            'show': false,
          },
          'role': {
            'show': false,
          },
          'permission': {
            'show': false,
          },
        },
        'service': {
          'show': false,
        },
        'account': {
          'show': false,
        },
      },
    },
    {
      'name': 'QT.KSV',
      'data': {
        'dashboard': {
          'cvpmqt': {
            'show': true,
          },
          'vpct': {
            'show': true,
          },
          'dvvt': {
            'show': true,
          },
        },
        'customer': {
          'show': true,
          'create': false,
          'update': false,
          'delete': false,
          'employee': true,
          'teacher': true,
          'student': true,//Sinh Vien
          'trainee': true,//Hoc Vien
          'revenue': true
        },
        'workflow': {
          'process': {
            'show': false,
            'create': false,
            'next': false,
          },
          'setting': {
            'show': false,
          },
          'form': {
            'show': false,
          },
        },
        'business': {
          'contract': {
            'show': false,
            'create': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },
        },
        'telecom': {
          'contract': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'contract-cooperation': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },

        },
        'security': {
          'group': {
            'show': false,
          },
          'user': {
            'show': false,
          },
          'role': {
            'show': false,
          },
          'permission': {
            'show': false,
          },
        },
        'service': {
          'show': false,
        },
        'account': {
          'show': false,
        },
      },
    },
    {
      'name': 'QT.CLTT.TP',
      'data': {
        'dashboard': {
          'cvpmqt': {
            'show': true,
          },
          'vpct': {
            'show': true,
          },
          'dvvt': {
            'show': true,
          },
        },
        'customer': {
          'show': true,
          'create': true,
          'update': true,
          'delete': true,
          'employee': true,
          'teacher': true,
          'student': true,//Sinh Vien
          'trainee': true,//Hoc Vien
          'revenue': true
        },
        'workflow': {
          'process': {
            'show': true,
            'create': true,
            'next': true,
          },
          'setting': {
            'show': false,
          },
          'form': {
            'show': false,
          },
        },
        'business': {
          'contract': {
            'show': false,
            'create': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },
        },
        'telecom': {
          'contract': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'contract-cooperation': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },

        },
        'security': {
          'group': {
            'show': false,
          },
          'user': {
            'show': false,
          },
          'role': {
            'show': false,
          },
          'permission': {
            'show': false,
          },
        },
        'service': {
          'show': false,
        },
        'account': {
          'show': false,
        },
      },
    },
    {
      'name': 'QT.CLTT.NTH',
      'data': {
        'dashboard': {
          'cvpmqt': {
            'show': true,
          },
          'vpct': {
            'show': true,
          },
          'dvvt': {
            'show': true,
          },
        },
        'customer': {
          'show': true,
          'create': true,
          'update': true,
          'delete': true,
          'employee': true,
          'teacher': true,
          'student': true,//Sinh Vien
          'trainee': true,//Hoc Vien
          'revenue': true
        },
        'workflow': {
          'process': {
            'show': true,
            'create': true,
            'next': true,
          },
          'setting': {
            'show': false,
          },
          'form': {
            'show': false,
          },
        },
        'business': {
          'contract': {
            'show': false,
            'create': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },
        },
        'telecom': {
          'contract': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'contract-cooperation': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },

        },
        'security': {
          'group': {
            'show': false,
          },
          'user': {
            'show': false,
          },
          'role': {
            'show': false,
          },
          'permission': {
            'show': false,
          },
        },
        'service': {
          'show': false,
        },
        'account': {
          'show': false,
        },
      },
    },
    {
      'name': 'QT.CLTT.SK&TT.TT',
      'data': {
        'dashboard': {
          'cvpmqt': {
            'show': true,
          },
          'vpct': {
            'show': false,
          },
          'dvvt': {
            'show': false,
          },
        },
        'customer': {
          'show': true,
          'create': true,
          'update': true,
          'delete': true,
          'employee': false,
          'teacher': false,
          'student': true,//Sinh Vien
          'trainee': true,//Hoc Vien
          'revenue': false
        },
        'workflow': {
          'process': {
            'show': true,
            'create': true,
            'next': true,
          },
          'setting': {
            'show': false,
          },
          'form': {
            'show': false,
          },
        },
        'business': {
          'contract': {
            'show': false,
            'create': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },
        },
        'telecom': {
          'contract': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'contract-cooperation': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },

        },
        'security': {
          'group': {
            'show': false,
          },
          'user': {
            'show': false,
          },
          'role': {
            'show': false,
          },
          'permission': {
            'show': false,
          },
        },
        'service': {
          'show': false,
        },
        'account': {
          'show': false,
        },
      },
    },
    {
      'name': 'QT.CLTT.SK&TT.NV',
      'data': {
        'dashboard': {
          'cvpmqt': {
            'show': true,
          },
          'vpct': {
            'show': false,
          },
          'dvvt': {
            'show': false,
          },
        },
        'customer': {
          'show': true,
          'create': true,
          'update': false,
          'delete': false,
          'employee': false,
          'teacher': false,
          'student': true,//Sinh Vien
          'trainee': true,//Hoc Vien
          'revenue': false
        },
        'workflow': {
          'process': {
            'show': true,
            'create': true,
            'next': true,
          },
          'setting': {
            'show': false,
          },
          'form': {
            'show': false,
          },
        },
        'business': {
          'contract': {
            'show': false,
            'create': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },
        },
        'telecom': {
          'contract': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'contract-cooperation': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },

        },
        'security': {
          'group': {
            'show': false,
          },
          'user': {
            'show': false,
          },
          'role': {
            'show': false,
          },
          'permission': {
            'show': false,
          },
        },
        'service': {
          'show': false,
        },
        'account': {
          'show': false,
        },
      },
    },
    {
      'name': 'QT.CLTT.GPCN.TT',
      'data': {
        'dashboard': {
          'cvpmqt': {
            'show': true,
          },
          'vpct': {
            'show': false,
          },
          'dvvt': {
            'show': false,
          },
        },
        'customer': {
          'show': true,
          'create': true,
          'update': true,
          'delete': true,
          'employee': false,
          'teacher': false,
          'student': false,//Sinh Vien
          'trainee': false,//Hoc Vien
          'revenue': false

        },
        'workflow': {
          'process': {
            'show': true,
            'create': true,
            'next': true,
          },
          'setting': {
            'show': false,
          },
          'form': {
            'show': false,
          },
        },
        'business': {
          'contract': {
            'show': false,
            'create': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },
        },
        'telecom': {
          'contract': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'contract-cooperation': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },

        },
        'security': {
          'group': {
            'show': false,
          },
          'user': {
            'show': false,
          },
          'role': {
            'show': false,
          },
          'permission': {
            'show': false,
          },
        },
        'service': {
          'show': false,
        },
        'account': {
          'show': false,
        },
      },
    },
    {
      'name': 'QT.CLTT.GPCN.NV',
      'data': {
        'dashboard': {
          'cvpmqt': {
            'show': true,
          },
          'vpct': {
            'show': false,
          },
          'dvvt': {
            'show': false,
          },
        },
        'customer': {
          'show': true,
          'create': true,
          'update': false,
          'delete': false,
          'employee': false,
          'teacher': false,
          'student': false,//Sinh Vien
          'trainee': false,//Hoc Vien
          'revenue': false
        },
        'workflow': {
          'process': {
            'show': true,
            'create': true,
            'next': true,
          },
          'setting': {
            'show': false,
          },
          'form': {
            'show': false,
          },
        },
        'business': {
          'contract': {
            'show': false,
            'create': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },
        },
        'telecom': {
          'contract': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'contract-cooperation': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },

        },
        'security': {
          'group': {
            'show': false,
          },
          'user': {
            'show': false,
          },
          'role': {
            'show': false,
          },
          'permission': {
            'show': false,
          },
        },
        'service': {
          'show': false,
        },
        'account': {
          'show': false,
        },
      },
    },
    {
      'name': 'QT.KD.TP',
      'data': {
        'dashboard': {
          'cvpmqt': {
            'show': true,
          },
          'vpct': {
            'show': true,
          },
          'dvvt': {
            'show': false,
          },
        },
        'customer': {
          'show': true,
          'create': true,
          'update': true,
          'delete': true,
          'employee': true,
          'teacher': true,
          'student': true,//Sinh Vien
          'trainee': true,//Hoc Vien
          'revenue': false
        },
        'workflow': {
          'process': {
            'show': true,
            'create': true,
            'next': true,
          },
          'setting': {
            'show': false,
          },
          'form': {
            'show': false,
          },
        },
        'business': {
          'contract': {
            'show': true,
            'create': true,
            'end': true,
          },
          'revenue': {
            'show': true,
          },
        },
        'telecom': {
          'contract': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'contract-cooperation': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },

        },
        'security': {
          'group': {
            'show': false,
          },
          'user': {
            'show': false,
          },
          'role': {
            'show': false,
          },
          'permission': {
            'show': false,
          },
        },
        'service': {
          'show': false,
        },
        'account': {
          'show': false,
        },
      },
    },
    {
      'name': 'QT.KD.NV',
      'data': {
        'dashboard': {
          'cvpmqt': {
            'show': false,
          },
          'vpct': {
            'show': true,
          },
          'dvvt': {
            'show': false,
          },
        },
        'customer': {
          'show': true,
          'create': true,
          'update': false,
          'delete': false,
          'employee': true,
          'teacher': true,
          'student': true,//Sinh Vien
          'trainee': true,//Hoc Vien
          'revenue': false
        },
        'workflow': {
          'process': {
            'show': true,
            'create': true,
            'next': true,
          },
          'setting': {
            'show': false,
          },
          'form': {
            'show': false,
          },
        },
        'business': {
          'contract': {
            'show': true,
            'create': true,
            'end': true,
          },
          'revenue': {
            'show': true,
          },
        },
        'telecom': {
          'contract': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'contract-cooperation': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },

        },
        'security': {
          'group': {
            'show': false,
          },
          'user': {
            'show': false,
          },
          'role': {
            'show': false,
          },
          'permission': {
            'show': false,
          },
        },
        'service': {
          'show': false,
        },
        'account': {
          'show': false,
        },
      },
    },
    {
      'name': 'QT.KSCL.TP',
      'data': {
        'dashboard': {
          'cvpmqt': {
            'show': true,
          },
          'vpct': {
            'show': false,
          },
          'dvvt': {
            'show': false,
          },
        },
        'customer': {
          'show': true,
          'create': true,
          'update': true,
          'delete': true,
          'employee': false,
          'teacher': false,
          'student': false,//Sinh Vien
          'trainee': false,//Hoc Vien
          'revenue': false
        },
        'workflow': {
          'process': {
            'show': true,
            'create': false,
            'next': true,
          },
          'setting': {
            'show': false,
          },
          'form': {
            'show': false,
          },
        },
        'business': {
          'contract': {
            'show': false,
            'create': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },
        },
        'telecom': {
          'contract': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'contract-cooperation': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },
        },
        'security': {
          'group': {
            'show': false,
          },
          'user': {
            'show': false,
          },
          'role': {
            'show': false,
          },
          'permission': {
            'show': false,
          },
        },
        'service': {
          'show': false,
        },
        'account': {
          'show': false,
        },
      },
    },
    {
      'name': 'QT.KSCL.NV',
      'data': {
        'dashboard': {
          'cvpmqt': {
            'show': false,
          },
          'vpct': {
            'show': false,
          },
          'dvvt': {
            'show': false,
          },
        },
        'customer': {
          'show': true,
          'create': true,
          'update': false,
          'delete': false,
          'employee': false,
          'teacher': false,
          'student': false,//Sinh Vien
          'trainee': false,//Hoc Vien
          'revenue': false
        },
        'workflow': {
          'process': {
            'show': false,
            'create': false,
            'next': false,
          },
          'setting': {
            'show': false,
          },
          'form': {
            'show': false,
          },
        },
        'business': {
          'contract': {
            'show': false,
            'create': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },
        },
        'telecom': {
          'contract': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'contract-cooperation': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },
        },
        'security': {
          'group': {
            'show': false,
          },
          'user': {
            'show': false,
          },
          'role': {
            'show': false,
          },
          'permission': {
            'show': false,
          },
        },
        'service': {
          'show': false,
        },
        'account': {
          'show': false,
        },
      },
    },
    {
      'name': 'QT.QLĐT-HT.TP',
      'data': {
        'dashboard': {
          'cvpmqt': {
            'show': true,
          },
          'vpct': {
            'show': false,
          },
          'dvvt': {
            'show': false,
          },
        },
        'customer': {
          'show': true,
          'create': true,
          'update': true,
          'delete': true,
          'employee': false,
          'teacher': false,
          'student': false,//Sinh Vien
          'trainee': false,//Hoc Vien
          'revenue': false
        },
        'workflow': {
          'process': {
            'show': true,
            'create': false,
            'next': true,
          },
          'setting': {
            'show': false,
          },
          'form': {
            'show': false,
          },
        },
        'business': {
          'contract': {
            'show': false,
            'create': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },
        },
        'telecom': {
          'contract': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'contract-cooperation': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },
        },
        'security': {
          'group': {
            'show': false,
          },
          'user': {
            'show': false,
          },
          'role': {
            'show': false,
          },
          'permission': {
            'show': false,
          },
        },
        'service': {
          'show': false,
        },
        'account': {
          'show': false,
        },
      },
    },
    {
      'name': 'QT.QLĐT-HT.PP',
      'data': {
        'dashboard': {
          'cvpmqt': {
            'show': true,
          },
          'vpct': {
            'show': false,
          },
          'dvvt': {
            'show': false,
          },
        },
        'customer': {
          'show': true,
          'create': true,
          'update': true,
          'delete': true,
          'employee': false,
          'teacher': false,
          'student': false,//Sinh Vien
          'trainee': false,//Hoc Vien
          'revenue': false
        },
        'workflow': {
          'process': {
            'show': true,
            'create': false,
            'next': true,
          },
          'setting': {
            'show': false,
          },
          'form': {
            'show': false,
          },
        },
        'business': {
          'contract': {
            'show': false,
            'create': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },
        },
        'telecom': {
          'contract': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'contract-cooperation': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },
        },
        'security': {
          'group': {
            'show': false,
          },
          'user': {
            'show': false,
          },
          'role': {
            'show': false,
          },
          'permission': {
            'show': false,
          },
        },
        'service': {
          'show': false,
        },
        'account': {
          'show': false,
        },
      },
    },
    {
      'name': 'QT.QLĐT-HT.NV',
      'data': {
        'dashboard': {
          'cvpmqt': {
            'show': false,
          },
          'vpct': {
            'show': false,
          },
          'dvvt': {
            'show': false,
          },
        },
        'customer': {
          'show': true,
          'create': true,
          'update': false,
          'delete': false,
          'employee': false,
          'teacher': false,
          'student': false,//Sinh Vien
          'trainee': false,//Hoc Vien
          'revenue': false
        },
        'workflow': {
          'process': {
            'show': true,
            'create': false,
            'next': true,
          },
          'setting': {
            'show': false,
          },
          'form': {
            'show': false,
          },
        },
        'business': {
          'contract': {
            'show': false,
            'create': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },
        },
        'telecom': {
          'contract': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'contract-cooperation': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },
        },
        'security': {
          'group': {
            'show': false,
          },
          'user': {
            'show': false,
          },
          'role': {
            'show': false,
          },
          'permission': {
            'show': false,
          },
        },
        'service': {
          'show': false,
        },
        'account': {
          'show': false,
        },
      },
    },
    {
      'name': 'QT.HCQT.PP',
      'data': {
        'dashboard': {
          'cvpmqt': {
            'show': true,
          },
          'vpct': {
            'show': false,
          },
          'dvvt': {
            'show': false,
          },
        },
        'customer': {
          'show': true,
          'create': true,
          'update': true,
          'delete': true,
          'employee': false,
          'teacher': false,
          'student': false,//Sinh Vien
          'trainee': false,//Hoc Vien
          'revenue': false
        },
        'workflow': {
          'process': {
            'show': false,
            'create': false,
            'next': false,
          },
          'setting': {
            'show': false,
          },
          'form': {
            'show': false,
          },
        },
        'business': {
          'contract': {
            'show': false,
            'create': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },
        },
        'telecom': {
          'contract': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'contract-cooperation': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },
        },
        'security': {
          'group': {
            'show': false,
          },
          'user': {
            'show': false,
          },
          'role': {
            'show': false,
          },
          'permission': {
            'show': false,
          },
        },
        'service': {
          'show': false,
        },
        'account': {
          'show': false,
        },
      },
    },
    {
      'name': 'QT.HCQT.NV',
      'data': {
        'dashboard': {
          'cvpmqt': {
            'show': false,
          },
          'vpct': {
            'show': false,
          },
          'dvvt': {
            'show': false,
          },
        },
        'customer': {
          'show': true,
          'create': true,
          'update': false,
          'delete': false,
          'employee': false,
          'teacher': false,
          'student': false,//Sinh Vien
          'trainee': false,//Hoc Vien
          'revenue': false
        },
        'workflow': {
          'process': {
            'show': false,
            'create': false,
            'next': false,
          },
          'setting': {
            'show': false,
          },
          'form': {
            'show': false,
          },
        },
        'business': {
          'contract': {
            'show': false,
            'create': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },
        },
        'telecom': {
          'contract': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'contract-cooperation': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },
        },
        'security': {
          'group': {
            'show': false,
          },
          'user': {
            'show': false,
          },
          'role': {
            'show': false,
          },
          'permission': {
            'show': false,
          },
        },
        'service': {
          'show': false,
        },
        'account': {
          'show': false,
        },
      },
    },
    {
      'name': 'QT.QLTN.PP',
      'data': {
        'dashboard': {
          'cvpmqt': {
            'show': true,
          },
          'vpct': {
            'show': false,
          },
          'dvvt': {
            'show': false,
          },
        },
        'customer': {
          'show': true,
          'create': true,
          'update': true,
          'delete': true,
          'employee': false,
          'teacher': false,
          'student': false,//Sinh Vien
          'trainee': false,//Hoc Vien
          'revenue': false
        },
        'workflow': {
          'process': {
            'show': true,
            'create': false,
            'next': true,
          },
          'setting': {
            'show': false,
          },
          'form': {
            'show': false,
          },
        },
        'business': {
          'contract': {
            'show': false,
            'create': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },
        },
        'telecom': {
          'contract': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'contract-cooperation': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },
        },
        'security': {
          'group': {
            'show': false,
          },
          'user': {
            'show': false,
          },
          'role': {
            'show': false,
          },
          'permission': {
            'show': false,
          },
        },
        'service': {
          'show': false,
        },
        'account': {
          'show': false,
        },
      },
    },
    {
      'name': 'QT.QLTN.NV',
      'data': {
        'dashboard': {
          'cvpmqt': {
            'show': false,
          },
          'vpct': {
            'show': false,
          },
          'dvvt': {
            'show': false,
          },
        },
        'customer': {
          'show': true,
          'create': true,
          'update': false,
          'delete': false,
          'employee': false,
          'teacher': false,
          'student': false,//Sinh Vien
          'trainee': false,//Hoc Vien
          'revenue': false
        },
        'workflow': {
          'process': {
            'show': true,
            'create': false,
            'next': true,
          },
          'setting': {
            'show': false,
          },
          'form': {
            'show': false,
          },
        },
        'business': {
          'contract': {
            'show': false,
            'create': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },
        },
        'telecom': {
          'contract': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'contract-cooperation': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },
        },
        'security': {
          'group': {
            'show': false,
          },
          'user': {
            'show': false,
          },
          'role': {
            'show': false,
          },
          'permission': {
            'show': false,
          },
        },
        'service': {
          'show': false,
        },
        'account': {
          'show': false,
        },
      },
    },
    {
      'name': 'QT.KTTC.KTT',
      'data': {
        'dashboard': {
          'cvpmqt': {
            'show': true,
          },
          'vpct': {
            'show': true,
          },
          'dvvt': {
            'show': true,
          },
        },
        'customer': {
          'show': true,
          'create': true,
          'update': true,
          'delete': true,
          'employee': false,
          'teacher': false,
          'student': false,//Sinh Vien
          'trainee': false,//Hoc Vien
          'revenue': false
        },
        'workflow': {
          'process': {
            'show': true,
            'create': false,
            'next': true,
          },
          'setting': {
            'show': false,
          },
          'form': {
            'show': false,
          },
        },
        'business': {
          'contract': {
            'show': true,
            'create': false,
            'end': false,
          },
          'revenue': {
            'show': true,
          },
        },
        'telecom': {
          'contract': {
            'show': true,
            'create': false,
            'update': false,
            'end': false,
          },
          'contract-cooperation': {
            'show': true,
            'create': false,
            'update': false,
            'end': false,
          },
          'revenue': {
            'show': true,
          },
        },
        'security': {
          'group': {
            'show': false,
          },
          'user': {
            'show': false,
          },
          'role': {
            'show': false,
          },
          'permission': {
            'show': false,
          },
        },
        'service': {
          'show': false,
        },
        'account': {
          'show': false,
        },
      },
    },
    {
      'name': 'QT.KTTC.PP',
      'data': {
        'dashboard': {
          'cvpmqt': {
            'show': true,
          },
          'vpct': {
            'show': true,
          },
          'dvvt': {
            'show': true,
          },
        },
        'customer': {
          'show': true,
          'create': true,
          'update': true,
          'delete': true,
          'employee': false,
          'teacher': false,
          'student': false,//Sinh Vien
          'trainee': false,//Hoc Vien
          'revenue': false
        },
        'workflow': {
          'process': {
            'show': true,
            'create': false,
            'next': true,
          },
          'setting': {
            'show': false,
          },
          'form': {
            'show': false,
          },
        },
        'business': {
          'contract': {
            'show': false,
            'create': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },
        },
        'telecom': {
          'contract': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'contract-cooperation': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },
        },
        'security': {
          'group': {
            'show': false,
          },
          'user': {
            'show': false,
          },
          'role': {
            'show': false,
          },
          'permission': {
            'show': false,
          },
        },
        'service': {
          'show': false,
        },
        'account': {
          'show': false,
        },
      },
    },
    {
      'name': 'QT.KTTC.NV',
      'data': {
        'dashboard': {
          'cvpmqt': {
            'show': false,
          },
          'vpct': {
            'show': false,
          },
          'dvvt': {
            'show': false,
          },
        },
        'customer': {
          'show': true,
          'create': true,
          'update': false,
          'delete': false,
          'employee': false,
          'teacher': false,
          'student': false,//Sinh Vien
          'trainee': false,//Hoc Vien
          'revenue': false
        },
        'workflow': {
          'process': {
            'show': true,
            'create': false,
            'next': true,
          },
          'setting': {
            'show': false,
          },
          'form': {
            'show': false,
          },
        },
        'business': {
          'contract': {
            'show': false,
            'create': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },
        },
        'telecom': {
          'contract': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'contract-cooperation': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },
        },
        'security': {
          'group': {
            'show': false,
          },
          'user': {
            'show': false,
          },
          'role': {
            'show': false,
          },
          'permission': {
            'show': false,
          },
        },
        'service': {
          'show': false,
        },
        'account': {
          'show': false,
        },
      },
    },
    {
      'name': 'QT.NS.TP',
      'data': {
        'dashboard': {
          'cvpmqt': {
            'show': true,
          },
          'vpct': {
            'show': false,
          },
          'dvvt': {
            'show': false,
          },
        },
        'customer': {
          'show': true,
          'create': true,
          'update': true,
          'delete': true,
          'employee': false,
          'teacher': false,
          'student': false,//Sinh Vien
          'trainee': false,//Hoc Vien
          'revenue': false
        },
        'workflow': {
          'process': {
            'show': false,
            'create': false,
            'next': false,
          },
          'setting': {
            'show': false,
          },
          'form': {
            'show': false,
          },
        },
        'business': {
          'contract': {
            'show': false,
            'create': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },
        },
        'telecom': {
          'contract': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'contract-cooperation': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },
        },
        'security': {
          'group': {
            'show': false,
          },
          'user': {
            'show': false,
          },
          'role': {
            'show': false,
          },
          'permission': {
            'show': false,
          },
        },
        'service': {
          'show': false,
        },
        'account': {
          'show': false,
        },
      },
    },
    {
      'name': 'QT.NS.NV',
      'data': {
        'dashboard': {
          'cvpmqt': {
            'show': false,
          },
          'vpct': {
            'show': false,
          },
          'dvvt': {
            'show': false,
          },
        },
        'customer': {
          'show': true,
          'create': true,
          'update': false,
          'delete': false,
          'employee': false,
          'teacher': false,
          'student': false,//Sinh Vien
          'trainee': false,//Hoc Vien
          'revenue': false
        },
        'workflow': {
          'process': {
            'show': false,
            'create': false,
            'next': false,
          },
          'setting': {
            'show': false,
          },
          'form': {
            'show': false,
          },
        },
        'business': {
          'contract': {
            'show': false,
            'create': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },
        },
        'telecom': {
          'contract': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'contract-cooperation': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },
        },
        'security': {
          'group': {
            'show': false,
          },
          'user': {
            'show': false,
          },
          'role': {
            'show': false,
          },
          'permission': {
            'show': false,
          },
        },
        'service': {
          'show': false,
        },
        'account': {
          'show': false,
        },
      },
    },
    {
      'name': 'QT.TTVT.TTT',
      'data': {
        'dashboard': {
          'cvpmqt': {
            'show': true,
          },
          'vpct': {
            'show': false,
          },
          'dvvt': {
            'show': true,
          },
        },
        'customer': {
          'show': true,
          'create': true,
          'update': true,
          'delete': true,
          'employee': false,
          'teacher': false,
          'student': false,//Sinh Vien
          'trainee': false,//Hoc Vien
          'revenue': false
        },
        'workflow': {
          'process': {
            'show': true,
            'create': true,
            'next': true,
          },
          'setting': {
            'show': false,
          },
          'form': {
            'show': false,
          },
        },
        'business': {
          'contract': {
            'show': false,
            'create': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },
        },
        'telecom': {
          'contract': {
            'show': true,
            'create': true,
            'update': true,
            'end': true,
          },
          'contract-cooperation': {
            'show': true,
            'create': true,
            'update': true,
            'end': true,
          },
          'revenue': {
            'show': true,
          },
        },
        'security': {
          'group': {
            'show': false,
          },
          'user': {
            'show': false,
          },
          'role': {
            'show': false,
          },
          'permission': {
            'show': false,
          },
        },
        'service': {
          'show': false,
        },
        'account': {
          'show': false,
        },
      },
    },
    {
      'name': 'QT.TTVT.PTT.DA',
      'data': {
        'dashboard': {
          'cvpmqt': {
            'show': true,
          },
          'vpct': {
            'show': false,
          },
          'dvvt': {
            'show': true,
          },
        },
        'customer': {
          'show': true,
          'create': true,
          'update': true,
          'delete': true,
          'employee': false,
          'teacher': false,
          'student': false,//Sinh Vien
          'trainee': false,//Hoc Vien
          'revenue': false
        },
        'workflow': {
          'process': {
            'show': true,
            'create': true,
            'next': true,
          },
          'setting': {
            'show': false,
          },
          'form': {
            'show': false,
          },
        },
        'business': {
          'contract': {
            'show': false,
            'create': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },
        },
        'telecom': {
          'contract': {
            'show': true,
            'create': true,
            'update': true,
            'end': true,
          },
          'contract-cooperation': {
            'show': true,
            'create': true,
            'update': true,
            'end': true,
          },
          'revenue': {
            'show': true,
          },
        },
        'security': {
          'group': {
            'show': false,
          },
          'user': {
            'show': false,
          },
          'role': {
            'show': false,
          },
          'permission': {
            'show': false,
          },
        },
        'service': {
          'show': false,
        },
        'account': {
          'show': false,
        },
      },
    },
    {
      'name': 'QT.TTVT.PTT.KT',
      'data': {
        'dashboard': {
          'cvpmqt': {
            'show': true,
          },
          'vpct': {
            'show': false,
          },
          'dvvt': {
            'show': true,
          },
        },
        'customer': {
          'show': true,
          'create': true,
          'update': true,
          'delete': true,
          'employee': false,
          'teacher': false,
          'student': false,//Sinh Vien
          'trainee': false,//Hoc Vien
          'revenue': false
        },
        'workflow': {
          'process': {
            'show': true,
            'create': true,
            'next': true,
          },
          'setting': {
            'show': false,
          },
          'form': {
            'show': false,
          },
        },
        'business': {
          'contract': {
            'show': false,
            'create': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },
        },
        'telecom': {
          'contract': {
            'show': true,
            'create': false,
            'update': false,
            'end': false,
          },
          'contract-cooperation': {
            'show': true,
            'create': false,
            'update': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },
        },
        'security': {
          'group': {
            'show': false,
          },
          'user': {
            'show': false,
          },
          'role': {
            'show': false,
          },
          'permission': {
            'show': false,
          },
        },
        'service': {
          'show': false,
        },
        'account': {
          'show': false,
        },
      },
    },
    {
      'name': 'QT.TTVT.NVKD',
      'data': {
        'dashboard': {
          'cvpmqt': {
            'show': false,
          },
          'vpct': {
            'show': false,
          },
          'dvvt': {
            'show': true,
          },
        },
        'customer': {
          'show': true,
          'create': true,
          'update': false,
          'delete': false,
          'employee': false,
          'teacher': false,
          'student': false,//Sinh Vien
          'trainee': false,//Hoc Vien
          'revenue': false
        },
        'workflow': {
          'process': {
            'show': true,
            'create': true,
            'next': true,
          },
          'setting': {
            'show': false,
          },
          'form': {
            'show': false,
          },
        },
        'business': {
          'contract': {
            'show': false,
            'create': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },
        },
        'telecom': {
          'contract': {
            'show': true,
            'create': true,
            'update': true,
            'end': true,
          },
          'contract-cooperation': {
            'show': true,
            'create': true,
            'update': true,
            'end': true,
          },
          'revenue': {
            'show': true,
          },
        },
        'security': {
          'group': {
            'show': false,
          },
          'user': {
            'show': false,
          },
          'role': {
            'show': false,
          },
          'permission': {
            'show': false,
          },
        },
        'service': {
          'show': true,
        },
        'account': {
          'show': false,
        },
      },
    },
    {
      'name': 'QT.TTVT.NVKT',
      'data': {
        'dashboard': {
          'cvpmqt': {
            'show': false,
          },
          'vpct': {
            'show': false,
          },
          'dvvt': {
            'show': true,
          },
        },
        'customer': {
          'show': true,
          'create': true,
          'update': false,
          'delete': false,
          'employee': false,
          'teacher': false,
          'student': false,//Sinh Vien
          'trainee': false,//Hoc Vien
          'revenue': false
        },
        'workflow': {
          'process': {
            'show': true,
            'create': false,
            'next': false,
          },
          'setting': {
            'show': false,
          },
          'form': {
            'show': false,
          },
        },
        'business': {
          'contract': {
            'show': false,
            'create': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },
        },
        'telecom': {
          'contract': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'contract-cooperation': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },
        },
        'security': {
          'group': {
            'show': false,
          },
          'user': {
            'show': false,
          },
          'role': {
            'show': false,
          },
          'permission': {
            'show': false,
          },
        },
        'service': {
          'show': false,
        },
        'account': {
          'show': false,
        },
      },
    },
    {
      'name': 'QT.HT&CSKH.TP',
      'data': {
        'dashboard': {
          'cvpmqt': {
            'show': true,
          },
          'vpct': {
            'show': false,
          },
          'dvvt': {
            'show': false,
          },
        },
        'customer': {
          'show': true,
          'create': true,
          'update': true,
          'delete': true,
          'employee': false,
          'teacher': false,
          'student': false,//Sinh Vien
          'trainee': false,//Hoc Vien
          'revenue': false
        },
        'workflow': {
          'process': {
            'show': true,
            'create': true,
            'next': true,
          },
          'setting': {
            'show': false,
          },
          'form': {
            'show': false,
          },
        },
        'business': {
          'contract': {
            'show': false,
            'create': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },
        },
        'telecom': {
          'contract': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'contract-cooperation': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },
        },
        'security': {
          'group': {
            'show': false,
          },
          'user': {
            'show': false,
          },
          'role': {
            'show': false,
          },
          'permission': {
            'show': false,
          },
        },
        'service': {
          'show': false,
        },
        'account': {
          'show': false,
        },
      },
    },
    {
      'name': 'QT.HT&CSKH.TT',
      'data': {
        'dashboard': {
          'cvpmqt': {
            'show': true,
          },
          'vpct': {
            'show': false,
          },
          'dvvt': {
            'show': false,
          },
        },
        'customer': {
          'show': true,
          'create': true,
          'update': true,
          'delete': true,
          'employee': false,
          'teacher': false,
          'student': false,//Sinh Vien
          'trainee': false,//Hoc Vien
          'revenue': false
        },
        'workflow': {
          'process': {
            'show': true,
            'create': true,
            'next': true,
          },
          'setting': {
            'show': false,
          },
          'form': {
            'show': false,
          },
        },
        'business': {
          'contract': {
            'show': false,
            'create': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },
        },
        'telecom': {
          'contract': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'contract-cooperation': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },
        },
        'security': {
          'group': {
            'show': false,
          },
          'user': {
            'show': false,
          },
          'role': {
            'show': false,
          },
          'permission': {
            'show': false,
          },
        },
        'service': {
          'show': false,
        },
        'account': {
          'show': false,
        },
      },
    },
    {
      'name': 'QT.HT&CSKH.NV',
      'data': {
        'dashboard': {
          'cvpmqt': {
            'show': true,
          },
          'vpct': {
            'show': false,
          },
          'dvvt': {
            'show': false,
          },
        },
        'customer': {
          'show': true,
          'create': true,
          'update': false,
          'delete': false,
          'employee': false,
          'teacher': false,
          'student': false,//Sinh Vien
          'trainee': false,//Hoc Vien
          'revenue': false
        },
        'workflow': {
          'process': {
            'show': true,
            'create': true,
            'next': true,
          },
          'setting': {
            'show': false,
          },
          'form': {
            'show': false,
          },
        },
        'business': {
          'contract': {
            'show': false,
            'create': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },
        },
        'telecom': {
          'contract': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'contract-cooperation': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },
        },
        'security': {
          'group': {
            'show': false,
          },
          'user': {
            'show': false,
          },
          'role': {
            'show': false,
          },
          'permission': {
            'show': false,
          },
        },
        'service': {
          'show': false,
        },
        'account': {
          'show': false,
        },
      },
    },
    {
      'name': 'QT.KTĐN.PP',
      'data': {
        'dashboard': {
          'cvpmqt': {
            'show': true,
          },
          'vpct': {
            'show': false,
          },
          'dvvt': {
            'show': false,
          },
        },
        'customer': {
          'show': true,
          'create': true,
          'update': true,
          'delete': true,
          'employee': false,
          'teacher': false,
          'student': false,//Sinh Vien
          'trainee': false,//Hoc Vien
          'revenue': false
        },
        'workflow': {
          'process': {
            'show': true,
            'create': false,
            'next': true,
          },
          'setting': {
            'show': false,
          },
          'form': {
            'show': false,
          },
        },
        'business': {
          'contract': {
            'show': false,
            'create': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },
        },
        'telecom': {
          'contract': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'contract-cooperation': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },
        },
        'security': {
          'group': {
            'show': false,
          },
          'user': {
            'show': false,
          },
          'role': {
            'show': false,
          },
          'permission': {
            'show': false,
          },
        },
        'service': {
          'show': false,
        },
        'account': {
          'show': false,
        },
      },
    },
    {
      'name': 'QT.KTĐN.NV',
      'data': {
        'dashboard': {
          'cvpmqt': {
            'show': false,
          },
          'vpct': {
            'show': false,
          },
          'dvvt': {
            'show': false,
          },
        },
        'customer': {
          'show': true,
          'create': true,
          'update': false,
          'delete': false,
          'employee': false,
          'teacher': false,
          'student': false,//Sinh Vien
          'trainee': false,//Hoc Vien
          'revenue': false
        },
        'workflow': {
          'process': {
            'show': true,
            'create': false,
            'next': true,
          },
          'setting': {
            'show': false,
          },
          'form': {
            'show': false,
          },
        },
        'business': {
          'contract': {
            'show': false,
            'create': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },
        },
        'telecom': {
          'contract': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'contract-cooperation': {
            'show': false,
            'create': false,
            'update': false,
            'end': false,
          },
          'revenue': {
            'show': false,
          },
        },
        'security': {
          'group': {
            'show': false,
          },
          'user': {
            'show': false,
          },
          'role': {
            'show': false,
          },
          'permission': {
            'show': false,
          },
        },
        'service': {
          'show': false,
        },
        'account': {
          'show': false,
        },
      },
    },
    {
      'name': 'QT.QLPM.ADMIN',
      'data': {
        'dashboard': {
          'cvpmqt': {
            'show': true,
          },
          'vpct': {
            'show': true,
          },
          'dvvt': {
            'show': true,
          },
        },
        'customer': {
          'show': true,
          'create': true,
          'update': true,
          'delete': true,
          'employee': true,
          'teacher': true,
          'student': true,//Sinh Vien
          'trainee': true,//Hoc Vien
          'revenue': true
        },
        'workflow': {
          'process': {
            'show': true,
            'create': true,
            'next': true,
          },
          'setting': {
            'show': true,
          },
          'form': {
            'show': true,
          },
        },
        'business': {
          'contract': {
            'show': true,
            'create': true,
            'end': true,
          },
          'revenue': {
            'show': true,
          },
        },
        'telecom': {
          'contract': {
            'show': true,
            'create': true,
            'update': true,
            'end': true,
          },
          'contract-cooperation': {
            'show': true,
            'create': true,
            'update': true,
            'end': true,
          },
          'revenue': {
            'show': true,
          },
        },
        'security': {
          'group': {
            'show': true,
          },
          'user': {
            'show': true,
          },
          'role': {
            'show': true,
          },
          'permission': {
            'show': true,
          },
        },
        'service': {
          'show': true,
        },
        'account': {
          'show': true,
        },
      },
    },
  ],
};

export function parseObject(
  object: any,
  formatObject?: { matchFormat?: string, changeFormat?: string }
) {
  let finalData: any;
  if (typeof object === 'string') {
    finalData = object.trim();
    if (object.indexOf('data:image') !== -1) {
      finalData = object.split(',')[1];
    }
  } else {
    finalData = Object.assign({}, object);
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        if (object[key] instanceof Array) {
          finalData[key] = parseArray(object[key]);
        } else if (object[key] instanceof Date) {
          finalData[key] = moment(object[key])
            .format('YYYY-MM-DDTHH:mm:ss.SSSZ');
        } else if (object[key] instanceof Object) {
          finalData[key] = parseObject(object[key]);
        } else if (typeof object[key] === 'string') {
          if (
            formatObject
            && moment(object[key], formatObject.matchFormat, true).isValid()
          ) {
            finalData[key] = moment(object[key])
              .format('YYYY-MM-DDTHH:mm:ss.SSSZ');
          } else {
            finalData[key] = parseObject(object[key]);
          }
        }
      }
    }
  }
  return finalData;
}

export function parseArray(bigArray: Array<any>) {
  const finalData = Object.assign([], bigArray);
  for (let i = 0; i < bigArray.length; i++) {
    if (typeof bigArray[i] === 'object') {
      finalData[i] = parseObject(bigArray[i]);
    }
    if (typeof bigArray[i] === 'string') {
      finalData[i] = bigArray[i].trim();
      if (bigArray[i].indexOf('data:image') !== -1) {
        finalData[i] = bigArray[i].split(',')[1];
      }
    }
  }
  return finalData;
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
