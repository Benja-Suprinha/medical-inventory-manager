import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthRoutesService implements CanActivate {

  constructor(
    private router: Router
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const currentUserRole = sessionStorage.getItem('role'); 
    console.log(route.data.role,currentUserRole)
    if(route.data && route.data.role){
      const requiredRole = route.data.role
      if (currentUserRole === 'admin' && requiredRole !== 'admin') {
        // Redirigir al usuario a una página de acceso denegado o a una página predeterminada
        sessionStorage.clear()
        this.router.navigateByUrl('/noauth/login');
        return false;
      }

      if (currentUserRole === 'encargado_inventario' && requiredRole !== 'encargado_inventario') {
        // Redirigir al usuario a una página de acceso denegado o a una página predeterminada
        sessionStorage.clear()
        this.router.navigateByUrl('/noauth/login');
        return false;
      }

      if (currentUserRole === 'personal_medico' && requiredRole !== 'personal_medico') {
        // Redirigir al usuario a una página de acceso denegado o a una página predeterminada
        sessionStorage.clear()
        this.router.navigateByUrl('/noauth/login');
        return false;
      }
      return true
    }
    return true
  }
}
