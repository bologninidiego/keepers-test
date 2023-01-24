import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, max, takeUntil, tap } from 'rxjs';
import { ListColumnDef } from 'src/app/core/list/list.types';
import { Deal, dealColumnDefs, dealDetailDefs } from 'src/app/core/deal/deal.types';
import { DetailColumnDef } from 'src/app/core/detail/detail.type';
import { MatDialog } from '@angular/material/dialog';
import { DealDetailComponent } from './detail/deal-detail.component';

@Injectable({
    providedIn: 'root'
})
export class DealService
{
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    private _activeDealBS: BehaviorSubject<Deal> = new BehaviorSubject<Deal>(null);
    private _activeDeal: Subject<Deal> = new Subject<Deal>;
    
    private _dealList: BehaviorSubject<Deal[]> = new BehaviorSubject([]);

    constructor(
      private _matDialog: MatDialog
    ){
      this._activeDealBS.pipe(takeUntil(this._unsubscribeAll)).subscribe((deal: Deal) => {
        if (deal) {
          if (deal.purchasePrice >= 0 && deal.netOperatingIncome >= 0) deal.capRate = Number(((deal.netOperatingIncome/deal.purchasePrice)*100))
          this._activeDeal.next(deal);
        }
      });
    }

    get activeDeal$(): Observable<Deal>{
      return this._activeDeal.asObservable();
    }
    
    get dealList$(): Observable<Deal[]>{
      return this._dealList.asObservable();
    }

    public getActiveDealValue(): Deal{
      return this._activeDealBS.value;
    }

    public addDealToDealList(deal: Deal): void{
      this.deleteDealFromDealList(deal);

      let rows = this._dealList.value.slice();
      if (!deal.id){
        deal.id = rows.length === 0 ? 0 : Math.max.apply(Math, rows.map(function(d) { return d.id; }));
        deal.id+=1;
      }
      rows.push(deal);
      this._dealList.next(rows);
    }

    public deleteDealFromDealList(deal: Deal) {
      let rows = this._dealList.value.slice();
      const presentRowIndex = deal.id? rows.findIndex((r) => r.id === deal.id) : null;
      if (presentRowIndex !== null && presentRowIndex !== -1) {
        rows.splice(presentRowIndex, 1);
        this._dealList.next(rows);
      }
    }

    public setActiveDeal(deal: Deal): void{
      this._activeDealBS.next(deal);
    }

    public getDealListDefs(): ListColumnDef[] {
      return dealColumnDefs.sort(function(a, b) {
        return a.order > b.order ? 1 : -1;
      });
    }

    public getDealDetailDefs(): DetailColumnDef[] {
      return dealDetailDefs.sort(function(a, b) {
        return a.order > b.order ? 1 : -1;
      });
    }

    public openDealModal(deal: Deal): void{
      let dialogRef = this._matDialog.open(DealDetailComponent, {
        panelClass: 'deal-detail-modal',
      });

      dialogRef.afterOpened()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => { 
        this.setActiveDeal(deal);
      });
  
      dialogRef.afterClosed()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => { 
        dialogRef = null;
      });
    }
}
