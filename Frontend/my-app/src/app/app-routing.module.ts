import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SesionComponent } from './layout/public/sesion/sesion.component';
import { MainComponent } from './layout/private/main/main.component';
import { AuthRoutesService } from './core/authRoutes/auth-routes.service';

const routes: Routes = [{
  path:'noauth', 
  component: SesionComponent, 
  loadChildren: () => import("./modules/login/login.module").then(m => m.LoginModule)
},
{
  path:'auth', 
  component: MainComponent, 
  canActivate:[AuthRoutesService], 
  loadChildren: () => import("./modules/principal/principal.module").then(m => m.PrincipalModule)
},
{
  path:'**', redirectTo:'noauth/login'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
