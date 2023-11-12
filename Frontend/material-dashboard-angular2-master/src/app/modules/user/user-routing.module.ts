import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from 'app/layouts/private/main/main.component';
import { UserComponent } from './pages/user/user.component';
import { TableItemsComponent } from './pages/table-items/table-items.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'resumen'
      },
      {
        path: 'resumen',
        component: UserComponent
      },
      {
        path: 'items',
        component: TableItemsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
