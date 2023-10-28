import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManagerService } from 'app/shared/services/manager.service';

@Component({
  selector: 'app-table-products',
  templateUrl: './table-products.component.html',
  styleUrls: ['./table-products.component.scss']
})
export class TableProductsComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  products: any[] = []
  waiting: boolean = true

  constructor(
    private modal: NgbModal,
    private fb: FormBuilder,
    private managerService: ManagerService
  ) { }

  ngOnInit(): void {
    this.initTable()
  }

  async initTable(){
    const data: any = await this.managerService.Products().toPromise()
    this.waiting = false
    this.products = data
    console.log(this.products)
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
  editProduct(editModal,product){
    this.nameProduct = product.name_product
    this.idProduct = product.id
    this.myForm = this.fb.group({
      name:[product.name_product],
      description:[product.descripcion],
      cantidad:[product.cantidad],
      price:[product.precio]
    })
    this.modal.open(
      editModal, {
        backdrop: false
      }
    )
  }
  deleteProduct(id: number){
    console.log(id)
  }
  nameProduct?:string
  idProduct?:number
  replenishProduct(replenishModal,product){
    this.nameProduct = product.name_product
    this.idProduct = product.id
    console.log(this.nameProduct)
    this.myForm=this.fb.group({
      cantidad:['1']
    })
    this.modal.open(
      replenishModal,{
        backdrop:false
      }
    )
  }
  edit(){
    console.log(this.nameProduct)
  }
  replenish(){
    console.log(this.idProduct)
  }
}
