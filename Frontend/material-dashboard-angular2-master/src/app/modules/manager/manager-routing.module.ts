import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerComponent } from './pages/manager/manager.component';
import { MainComponent } from 'app/layouts/private/main/main.component';
import { TableProductsComponent } from './pages/table-products/table-products.component';
import { CreateProductsComponent } from './pages/create-products/create-products.component';
import { HistoryComponent } from './pages/history/history.component';

const routes: Routes = [
  {
    path:'',
    component: MainComponent,
    children: [
      {
        path:'',
        redirectTo: 'resumen'
      },
      {
        path:'resumen',
        component: ManagerComponent
      },
      {
        path:'products',
        component: TableProductsComponent
      },
      {
        path:'create',
        component:CreateProductsComponent
      },
      {
        path:'history',
        component:HistoryComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
