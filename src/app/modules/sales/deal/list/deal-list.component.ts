import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

import { Subject, takeUntil } from 'rxjs';
import { ListColumnDef } from 'src/app/core/list/list.types';
import { DealService } from '../deal.service';
import { DecimalPipe } from '@angular/common';
import { Deal } from 'src/app/core/deal/deal.types';

@Component({
    selector       : 'deal-list-component',
    templateUrl    : './deal-list.component.html',
    styleUrls      : [],
    encapsulation: ViewEncapsulation.None
})
export class DealListComponent implements OnInit, OnDestroy
{
    public dealRows: Deal[] = [];
    public selected: Deal[] = [];
    public dealListColumnDefs: ListColumnDef[] = [];

    private _unsubscribeAll: Subject<any> = new Subject<any>();
    private decimalPipe: DecimalPipe = new DecimalPipe('en-US');

    constructor(
      private _service: DealService,
    ){
      this.dealListColumnDefs = this._service.getDealListDefs();
    }

    ngOnInit(): void {
      this._service.dealList$.pipe(takeUntil(this._unsubscribeAll)).subscribe((list: Deal[]) => {
        this.dealRows = list;
      });
    }

    ngOnDestroy(): void
    {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    public getRowValue(row: any, colDef: ListColumnDef): any {
      switch (colDef.dataType) {
          case 'currency': {
            return (colDef.mask?.prefix ? colDef.mask?.prefix + ' ' : '') + this.decimalPipe.transform(row[colDef.fieldKey] || 0, colDef.mask?.decimals.toString());
          }
          case 'percentage': {
            return this.decimalPipe.transform(row[colDef.fieldKey] || 0, '1.2-2')?.concat(' %');
          }
          default: {
            return row[colDef.fieldKey];
          }
      }
    }

    public openDealModal(deal: Deal): void{
      this._service.openDealModal(deal);
    }
}
