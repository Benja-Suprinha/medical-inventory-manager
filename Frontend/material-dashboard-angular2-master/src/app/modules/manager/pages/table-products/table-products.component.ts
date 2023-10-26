import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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

  editProduct(user){
    console.log(user)
  }
  deleteProduct(id: number){
    console.log(id)
  }
}
