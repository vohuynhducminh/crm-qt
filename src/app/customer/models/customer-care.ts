export class CustomerCareCM {
  Type: string;
  Note: string;
  Date: string;
}
export class CustomerCareUM extends CustomerCareCM {
  Id: string;
}
export class CustomerCare extends CustomerCareUM {
}
export const CUSTOMER_CARE_TYPES = null;
