import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrincipalRoutingModule } from './principal-routing.module';
import { PrincipalComponent } from './pages/principal/principal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableListComponent } from './pages/table-list/table-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { MatTableModule } from '@angular/material/table';
import { DataTablesModule } from "angular-datatables";
import { SpinnerComponent } from './spinner/spinner.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    PrincipalComponent,
    TableListComponent,
    UserProfileComponent,
    SpinnerComponent,
  ],
  imports: [
    CommonModule,
    PrincipalRoutingModule,
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
  ],
  entryComponents: [TableListComponent]
})
export class PrincipalModule { }