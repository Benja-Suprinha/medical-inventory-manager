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
    if (!sessionStorage.getItem('status')) {
      this.router.navigateByUrl('/noauth/login')
    }
    return sessionStorage.getItem('status') ? true : false
  }
}
