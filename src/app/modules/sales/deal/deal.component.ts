import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { DealService } from './deal.service';

@Component({
    selector       : 'deal-component',
    templateUrl    : './deal.component.html',
    encapsulation  : ViewEncapsulation.None,
})
export class DealComponent implements OnInit, AfterViewInit, OnDestroy
{
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
      private _service: DealService
    )
    {
    }

    ngOnInit(): void
    {
        
    }

    ngAfterViewInit(): void
    {
    }

    ngOnDestroy(): void
    {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    public newDeal(){
      this._service.openDealModal(null);
    }
}
