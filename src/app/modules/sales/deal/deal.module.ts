import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { DealComponent } from './deal.component';
import { CommonModule } from '@angular/common';
import { DealListComponent } from './list/deal-list.component';
import { Route, RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DealDetailComponent } from './detail/deal-detail.component';
import { MatDialogModule } from '@angular/material/dialog';
//import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxCurrencyModule } from 'ngx-currency';
import { NgxMaskModule } from 'ngx-mask';


const route: Route[] = [
  {
      path     : '',
      component: DealComponent,
  }
];

export const customCurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  allowZero: true,
  decimal: ".",
  precision: 2,
  prefix: "$ ",
  suffix: "",
  thousands: ",",
  nullable: true
};

@NgModule({
    declarations: [
      DealComponent,
      DealListComponent,
      DealDetailComponent
    ],
    imports     : [
        RouterModule.forChild(route),
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatProgressBarModule,
        MatSortModule,
        MatTableModule,
        CommonModule,
        NgxDatatableModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatDialogModule,
        MatInputModule,
        //MatToolbarModule,
        MatCheckboxModule,
        NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
        NgxMaskModule.forRoot()
    ],
    exports: [
      DealComponent,
      DealDetailComponent
    ]
})
export class DealModule
{
}
