import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './layouts/private/main/main.component';
import { SesionComponent } from './layouts/public/sesion/sesion.component';
import { AuthRoutesService } from './core/authRoutes/auth-routes.service';

const routes: Routes = [
  {
    path: '', redirectTo: '/noauth/login', pathMatch: 'full'
  },
  {
    path: 'noauth',
    component: SesionComponent,
    loadChildren: () => import("./modules/login/login.module").then(m => m.LoginModule)
  },
  {
    path: 'principal',
    canActivate: [AuthRoutesService],
    loadChildren: () => import("./modules/principal/principal.module").then(m => m.PrincipalModule)
  },
  {
    path: '**', redirectTo: '/noauth/login'
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
