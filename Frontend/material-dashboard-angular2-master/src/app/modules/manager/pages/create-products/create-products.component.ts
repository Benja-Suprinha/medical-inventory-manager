import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ManagerService } from 'app/shared/services/manager.service';

@Component({
  selector: 'app-create-products',
  templateUrl: './create-products.component.html',
  styleUrls: ['./create-products.component.scss']
})
export class CreateProductsComponent implements OnInit {
  public myForm!: FormGroup
  constructor(
    private fb: FormBuilder,
    private managerService: ManagerService
  ) { }

  ngOnInit(): void {
  this.myForm=this.createMyForm()
  }

  createMyForm(): FormGroup {
    return this.fb.group({
      nameProduct: [''],
      description: [''],
      cantidad: [''],
      price: ['']
    })
  }

  async submitFormulary(){
    const res = await this.managerService.addProduct(
      this.myForm.value.nameProduct,
      this.myForm.value.description,
      this.myForm.value.cantidad,
      this.myForm.value.price
    ).toPromise()
    console.log(res)
    if (res && res.status) {
      alert("Item creado con exito!")
      this.myForm.reset()
    } else {
      alert("Ocurrio un error intente nuevamente")
    }
  }
}
