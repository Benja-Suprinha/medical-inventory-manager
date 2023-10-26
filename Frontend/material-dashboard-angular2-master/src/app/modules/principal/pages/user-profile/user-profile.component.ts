import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'app/shared/services/admin.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public myForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private routeSv: Router,
    private adminService: AdminService
  ) { }

  ngOnInit() {
    this.myForm = this.createMyForm()
  }

  createMyForm(): FormGroup {
    return this.fb.group({
      username: [''],
      mail: [''],
      password: [''],
      name: [''],
      type_user: [''],
      phone: ['']
    })
  }

  async submitFormulary() {
    const res = await this.adminService.addUser(
      this.myForm.value.username,
      this.myForm.value.password,
      this.myForm.value.name,
      this.myForm.value.mail,
      this.myForm.value.type_user,
      this.myForm.value.phone,
      sessionStorage.id
    ).toPromise()
    console.log(res)
    if (res && res.status) {
      alert("Usuario creado con exito!")
      this.myForm.reset()
    } else {
      alert("Ocurrio un error intente nuevamente")
    }
  }

}
