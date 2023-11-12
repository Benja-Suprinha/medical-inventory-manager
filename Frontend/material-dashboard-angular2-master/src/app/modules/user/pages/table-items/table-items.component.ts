import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'app/shared/services/user.service';

@Component({
  selector: 'app-table-items',
  templateUrl: './table-items.component.html',
  styleUrls: ['./table-items.component.scss']
})
export class TableItemsComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  products: any[] = []
  waiting: boolean = true

  constructor(
    private modal: NgbModal,
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.initTable()
  }

  async initTable(){
    const data: any = await this.userService.Items().toPromise()
    this.waiting = false
    this.products = data
    this.dtOptions = {
      language: {
        "search": "",
        "searchPlaceholder": "Filtrar...",
        "zeroRecords": "No se encuentran registros",
        "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
        "lengthMenu": "Mostrando _MENU_ registros",
        "paginate": {
          "first": "",
          "last": "",
          "previous": "Anterior",
          "next": "Siguiente"
        },
        "infoEmpty": "Mostrando 0 a 0 de 0 registros",
        "infoFiltered": "(filtrado de _MAX_ registros totales)"
      }
    };
  }

  public myForm!: FormGroup

  nameProduct?:string
  idProduct?:string
  cantProduct?:number

  withdrawItem(replenishModal,product){
    this.nameProduct = product.name_product
    this.idProduct = product.id
    this.cantProduct = product.cantidad
    this.myForm=this.fb.group({
      cantidad:['1']
    })
    this.modal.open(
      replenishModal,{
        backdrop:false
      }
    )
  }
  
  async withdraw(){
    console.log('llegue aca')
    if(this.myForm.value.cantidad > this.cantProduct){
      return alert('La cantidad excede al maximo!')
    }
    const res = await this.userService.withdrawItem(
      this.idProduct, 
      this.myForm.value.cantidad
      ).toPromise()
    if(res && res.status){
      alert(this.nameProduct + " usado correctamente")
      this.initTable()
      this.modal.dismissAll()
    }else{
      alert("Ocurrio un error intente nuevamente")      
    }
  }
}
