import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private ingresar: boolean = false;
  constructor(
    private http: HttpClient
  ) { }

  async ingresarAplicativo(obj: any){
    console.log(obj)
    const data: any = await this.log(obj.user,obj.password).toPromise()
    console.log(data)
    if(!data.status){
      alert('Usuario o contraseña incorrectos!')
      this.ingresar = false
    }else{
      this.ingresar = true
    }
    return true
  }

  public habilitarLogeo(){
    return this.ingresar
  }

  log(user:string,pass:string){
    return this.http.post('http://localhost:3000/auth/user', {
      username:user,
      password:pass
    }).pipe(
      map((response:any)=>{
        return response
      })
    )
  }
}
