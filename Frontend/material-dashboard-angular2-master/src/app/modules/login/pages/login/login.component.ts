import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from '../../../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public myForm!: FormGroup;
  waiting: boolean = true

  constructor(
    private fb: FormBuilder,
    private loginPrd: AuthService,
    private routesv: Router
  ) { }

  ngOnInit(): void {
    this.myForm = this.createMyForm();
  }

  private createMyForm(): FormGroup {
    return this.fb.group({
      user: ['', [Validators.required]],
      password: ['', Validators.required]
    })
  }

  public async submitFormulary() {
    const status = await this.loginPrd.ingresarAplicativo(this.myForm.value)

    console.log(this.myForm.value)
    if(status && this.loginPrd.role === 'admin'){
      this.routesv.navigateByUrl('/principal')
    }
    if(status && this.loginPrd.role === 'encargado_inventario'){
      this.routesv.navigateByUrl('/manager')
    }
    if(status && this.loginPrd.role === 'personal_medico'){
      this.routesv.navigateByUrl('/user')
    }
  }

  public get f(): any {
    return this.myForm.controls;
  }
}
