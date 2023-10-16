import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './pages/principal/principal.component';
import { MainComponent } from 'app/layouts/private/main/main.component';
import { TableListComponent } from './pages/table-list/table-list.component';

const routes: Routes = [{
  path: '',
  component: MainComponent,
  children: [
    {
      path: '',
      redirectTo: 'resumen'
    },
    {
      path: 'resumen',
      component: PrincipalComponent
    },
    {
      path: 'users',
      component: TableListComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrincipalRoutingModule { }