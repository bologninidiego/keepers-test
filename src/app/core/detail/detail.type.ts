import { ValidatorFn } from "@angular/forms";

export interface DetailColumnDef {
  fieldKey: string;
  placeholder: string;
  rowNo: number;
  width: number;
  order: number;
  dataType?: 'text' | 'number' | 'currency';
  mask?: string;
  suffix?: string;
  thousandSeparator?: string;
  disabled: false | true;
  validators: ValidatorFn | null;
}