import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { TableProductsComponent } from './pages/table-products/table-products.component';
import { CreateProductsComponent } from './pages/create-products/create-products.component';
import { ManagerComponent } from './pages/manager/manager.component';
import { HistoryComponent } from './pages/history/history.component';


@NgModule({
  declarations: [
    TableProductsComponent,
    CreateProductsComponent,
    ManagerComponent,
    HistoryComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule
  ]
})
export class ManagerModule { }
