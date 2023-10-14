import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private ingresar: boolean = false;
  constructor() { }

  public ingresarAplicativo(obj: any){
    if(obj.user == "lala" && obj.password == "1234"){
      this.ingresar = true
    }
    return this.ingresar
  }

  public habilitarLogeo(){
    return this.ingresar
  }
}
