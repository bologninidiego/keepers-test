import { Validators } from "@angular/forms";
import { DetailColumnDef } from "../detail/detail.type";
import { ListColumnDef } from "../list/list.types";

export interface Deal {
  id: number;
  name: string;
  purchasePrice: number;
  address: string;
  netOperatingIncome: number;
  capRate: number;
}

export const dealColumnDefs: ListColumnDef[] = 
[
    {
      fieldKey: 'id',
      title: 'Id',
      order: 0,
      width: 60,
  },
  {
      fieldKey: 'name',
      title: 'Name',
      order: 1,
      width: 300,
  },
  {
    fieldKey: 'purchasePrice',
    title: 'Purchase price',
    order: 3,
    width: 60,
    dataType: 'currency',
    mask: {
      prefix: '$',
      decimals: '1.2-2'
    }
  },
  {
    fieldKey: 'address',
    title: 'Address',
    order: 2,
    width: 300,
  },
  {
    fieldKey: 'netOperatingIncome',
    title: 'NOI',
    order: 4,
    width: 60,
    dataType: 'currency',
    mask: {
      prefix: '$',
      decimals: '1.2-2'
    }
  },
  {
    fieldKey: 'capRate',
    title: 'Cap Rate',
    order: 5,
    width: 60,
    dataType: 'percentage'
  },
];

export const dealDetailDefs: DetailColumnDef[] = 
[
  {
    fieldKey: 'name',
    disabled: false,
    placeholder: 'Name',
    dataType: 'text',
    rowNo: 1,
    order: 1,
    width: 50,
    validators: Validators.compose([
      Validators.required,
      Validators.maxLength(50)
    ]),
  },
  {
    fieldKey: 'purchasePrice',
    disabled: false,
    placeholder: 'Purchase price',
    dataType: 'currency',
    rowNo: 1,
    order: 2,
    width: 17.5,
    validators: Validators.compose([
      Validators.required,
    ]),
  },
  {
    fieldKey: 'address',
    disabled: false,
    placeholder: 'Address',
    dataType: 'text',
    rowNo: 2,
    order: 5,
    width: 100,
    validators: Validators.compose([
      Validators.required,
      Validators.maxLength(200)
    ]),
  },
  {
    fieldKey: 'netOperatingIncome',
    disabled: false,
    placeholder: 'NOI (Net operating income)',
    dataType: 'currency',
    rowNo: 1,
    order: 3,
    width: 22.5,
    validators: Validators.compose([
      Validators.required,
    ]),
  },
  {
    fieldKey: 'capRate',
    disabled: true,
    placeholder: 'Cap. rate',
    dataType: 'text',
    rowNo: 1,
    order: 4,
    width: 10,
    mask: 'separator.2',
    suffix: '%',
    thousandSeparator: ',',
    validators: Validators.compose([
      Validators.required,
    ]),
  },
  
];