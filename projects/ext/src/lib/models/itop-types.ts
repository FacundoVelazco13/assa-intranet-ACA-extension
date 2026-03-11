export interface ItopPerson {
  friendlyname: string;
  email: string;
  org_name: string;
  employee_number: string;
  location_name: string;
  mobile_phone: string;
}
export interface ItopApiResponse {
  success: boolean;
  statusCode: number;
  operation: string;
  // eslint-disable-next-line prettier/prettier
  class: string;
  key: string;
  data: ItopDataResponse;
}
export interface ItopDataResponse {
  code: number;
  message: string;
  objects: ItopPersonObject[];
}
export interface ItopPersonObject {
  code: number;
  // eslint-disable-next-line prettier/prettier
  class: string;
  key: string;
  fields: ItopPerson;
}
