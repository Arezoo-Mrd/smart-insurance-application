export interface DynamicFormData {
 formId: string;
 title: string;
 fields: Field[];
}

export interface Field {
 id: string;
 label: string;
 type:
  | "text"
  | "number"
  | "email"
  | "select"
  | "checkbox"
  | "radio"
  | "group"
  | "date"
  | "time"
  | "datetime"
  | "textarea"
  | "file"
  | "password"
  | "tel"
  | "color"
  | "url";

 fields?: SubField[];
 options?: string[];
 required?: boolean;
 validation?: Validation;
 visibility?: Visibility;
}

export interface SubField {
 id: string;
 label: string;
 type: string;
 options?: string[];
 required: boolean;
 visibility?: Visibility;
 validation?: Validation;
 dynamicOptions?: DynamicOptions;
}

export interface DynamicOptions {
 dependsOn: string;
 endpoint: string;
 method: string;
}

export interface Validation {
 min?: number;
 max?: number;
 pattern?: string;
}

export interface Visibility {
 dependsOn: string;
 condition: string;
 value: string;
}

export interface GetStatesResponse {
 country: string;
 states: string[];
}
