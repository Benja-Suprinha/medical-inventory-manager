import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { TableProductsComponent } from './pages/table-products/table-products.component';
import { CreateProductsComponent } from './pages/create-products/create-products.component';
import { ManagerComponent } from './pages/manager/manager.component';
import { HistoryComponent } from './pages/history/history.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerComponent } from './spinner/spinner.component';


@NgModule({
  declarations: [
    TableProductsComponent,
    CreateProductsComponent,
    ManagerComponent,
    HistoryComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatTableModule,
    DataTablesModule,
    NgbModalModule
  ]
})
export class ManagerModule { }
