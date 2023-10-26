import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private ingresar: boolean = false;
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  async ingresarAplicativo(obj: any) {
    const data: any = await this.log(obj.user, obj.password).toPromise()
    console.log(data)
    if (!data.status) {
      alert('Usuario o contraseña incorrectos!')
      this.ingresar = false
      this.router.navigateByUrl('/noauth/login')
      return false
    } else {
      sessionStorage.setItem('status', data.status)
      sessionStorage.setItem('role', data.type_user)
      sessionStorage.setItem('id', data.id)
      console.log(sessionStorage)
      this.ingresar = true
      return true
    }
  }

  public habilitarLogeo() {
    return this.ingresar
  }

  get role(){
    return sessionStorage.getItem('role')
  }

  log(user: string, pass: string) {
    return this.http.post('http://localhost:3000/auth/user', {
      username: user,
      password: pass
    }).pipe(
      map((response: any) => {
        return response
      })
    )
  }
}
