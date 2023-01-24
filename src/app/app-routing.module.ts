import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DealModule } from './modules/sales/deal/deal.module';


const routes: Routes = [
  {path: '', pathMatch : 'full', redirectTo: 'sample'},
  {path: 'sample', loadChildren: ()=> DealModule}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
