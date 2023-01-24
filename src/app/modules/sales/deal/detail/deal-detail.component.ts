

import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Deal } from 'src/app/core/deal/deal.types';
import { DetailColumnDef } from 'src/app/core/detail/detail.type';
import { MatDialogRef } from '@angular/material/dialog';
import { DealService } from '../deal.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'deal-detail-component',
  templateUrl: './deal-detail.component.html',
  styleUrls: ['./deal-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DealDetailComponent implements OnInit {

  public form!: FormGroup;
  public formLines!: [[DetailColumnDef?]];
  public dealDetailDefs: DetailColumnDef[];

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    public dialogRef: MatDialogRef<any>,
    private _service: DealService,
    private _formBuilder: FormBuilder,
  ) { 
    this.dealDetailDefs = this._service.getDealDetailDefs();
    this.buildForm();
  }

  ngOnInit(
  ) {
    this._service.activeDeal$.pipe(takeUntil(this._unsubscribeAll)).subscribe((deal: Deal) => {
      this.form.patchValue(deal);
    });
  }

  private buildForm(): void {
    this.formLines = [[]];
    this.dealDetailDefs.forEach(fd => {
      if (!this.formLines[fd.rowNo]) this.formLines[fd.rowNo] = []
      this.formLines[fd.rowNo].push(fd);
    });

    this.form = this._formBuilder.group({
      id: [null, this.getFormFieldProp('id')],
      name: [null, this.getFormFieldProp('name')],
      purchasePrice: [null, this.getFormFieldProp('purchasePrice')],
      address: [null, this.getFormFieldProp('address')],
      netOperatingIncome: [null, this.getFormFieldProp('netOperatingIncome')],
      capRate: [null, this.getFormFieldProp('capRate')],
    });
    this.form.markAllAsTouched();
  }

  getFormFieldProp(fieldKey: string){
    let myMap = new Map(this.dealDetailDefs.map(obj => [obj.fieldKey, obj.validators]));
    return myMap.get(fieldKey);
  }

  saveOrUpdate() {
    this._service.addDealToDealList(this.form.getRawValue());
    this.dialogRef.close();
  }

  delete() {
    this._service.deleteDealFromDealList(this.form.getRawValue());
    this.dialogRef.close();
  }

  onKeyUp() {
    this._service.setActiveDeal(this.form.getRawValue())
  }

}
