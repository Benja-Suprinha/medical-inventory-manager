import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from '../../../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  public myForm!:FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginPrd: AuthService,
    private routesv: Router
  ){}

  ngOnInit(): void {
    this.myForm = this.createMyForm();
  }

  private createMyForm(): FormGroup{
    return this.fb.group({
      user: ['',[Validators.required]],
      password: ['', Validators.required]
    })
  }

  public submitFormulary(){
    if(this.myForm.invalid){
      Object.values(this.myForm.controls).forEach(control=>{
        control.markAllAsTouched();
      })
      return
    }
    console.log(this.myForm.value)
    if(!this.loginPrd.ingresarAplicativo(this.myForm.value)){
      alert("Usuario o contraseña invalida")
    }else{
      this.routesv.navigateByUrl("/auth/principal")
    }
  }

  public get f():any{
    return this.myForm.controls;
  }
}
