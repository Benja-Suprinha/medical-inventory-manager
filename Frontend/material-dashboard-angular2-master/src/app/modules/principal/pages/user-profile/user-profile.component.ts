import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public myForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private routeSv: Router
  ) { }

  ngOnInit() {
    this.myForm = this.createMyForm() 
  }

  createMyForm(): FormGroup{
    return this.fb.group({
      username:[''],
      mail:[''],
      password:[''],
      name:[''],
      type_user:[''],
      phone:['']
    })
  }

  submitFormulary(){
    console.log(this.myForm.value)
  }

}
